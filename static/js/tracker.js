// ===== TRACKER (food log, water log, workout checklist) =====
// Requires: common.js, data.js (workouts).

let foodEntries = []; // {id, calories, label}
let waterFilled = 0;

window.addFood = async function() {
    const input = document.getElementById('foodInput');
    const val = parseInt(input.value);
    if (!val || val <= 0) return;

    if (authToken) {
        const res = await apiFetch('/food-logs', {
            method: 'POST',
            body: JSON.stringify({ calories: val, label: 'Makanan' })
        });
        if (res && res.ok) {
            const data = await res.json();
            foodEntries.push({ id: data.id, calories: data.calories });
        }
    } else {
        foodEntries.push({ id: Date.now(), calories: val });
    }
    input.value = '';
    renderFoodLog();
};

document.getElementById('foodInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') window.addFood();
});

function renderFoodLog() {
    const log = document.getElementById('foodLog');
    if (!log) return;
    log.innerHTML = foodEntries.map((entry, i) => `
        <div class="food-entry">
            <span>Makanan ${i + 1}: ${entry.calories} kkal</span>
            <button class="remove-btn" onclick="removeFood(${i})">&#10005;</button>
        </div>
    `).join('');

    const total = foodEntries.reduce((a, b) => a + b.calories, 0);
    document.getElementById('totalCaloriesTracker').textContent = total;

    const target = window.dailyCalorieTarget || 2000;
    const pct = Math.min((total / target) * 100, 100);
    const circumference = 2 * Math.PI * 35;
    const offset = circumference - (pct / 100) * circumference;
    document.getElementById('calorieRing').style.strokeDashoffset = offset;
    document.getElementById('caloriePercent').textContent = Math.round(pct) + '%';

    const ring = document.getElementById('calorieRing');
    if (pct >= 100) ring.style.stroke = '#C4704B';
    else if (pct >= 80) ring.style.stroke = '#C9A84C';
    else ring.style.stroke = '#8B9D77';
}

window.removeFood = async function(index) {
    const entry = foodEntries[index];
    if (authToken && entry.id) {
        await apiFetch('/food-logs/' + entry.id, { method: 'DELETE' });
    }
    foodEntries.splice(index, 1);
    renderFoodLog();
};

// Water Tracker
function renderWaterTracker() {
    const container = document.getElementById('waterTracker');
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const glass = document.createElement('div');
        glass.className = 'water-glass';
        glass.textContent = '\uD83D\uDCA7';
        glass.addEventListener('click', () => toggleWater(i));
        container.appendChild(glass);
    }
}

async function toggleWater(index) {
    const glasses = document.querySelectorAll('.water-glass');
    if (index + 1 === waterFilled) {
        waterFilled = index;
    } else {
        waterFilled = index + 1;
    }
    glasses.forEach((g, i) => g.classList.toggle('filled', i < waterFilled));
    document.getElementById('waterCount').textContent = waterFilled;

    if (authToken) {
        await apiFetch('/water-logs', {
            method: 'POST',
            body: JSON.stringify({ glasses: waterFilled })
        });
    }
}

renderWaterTracker();

// Workout Checklist (today's workout based on level)
function renderChecklist(level) {
    level = level || 'beginner';
    const container = document.getElementById('workoutChecklist');
    if (!container) return;
    const today = new Date().getDay();
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const todayName = dayNames[today];

    const todayWorkout = workouts[level].find(d => d.day === todayName);

    if (!todayWorkout || todayWorkout.rest) {
        container.innerHTML = `<p>Hari ini adalah hari istirahat. Nikmati recovery Anda! &#128564;</p>`;
        return;
    }

    container.innerHTML = `<p style="color:var(--sage-light);font-weight:600;margin-bottom:12px;font-style:normal">
        ${todayName} — ${todayWorkout.focus}</p>` +
        todayWorkout.exercises.map((ex, i) => `
            <label>
                <input type="checkbox" id="check_${i}" onchange="saveWorkoutCheck('${ex.name.replace(/'/g, "\\'")}', this.checked)">
                ${ex.name} (${ex.detail})
            </label>
        `).join('');

    if (authToken) {
        apiFetch('/workout-logs').then(res => res && res.json()).then(logs => {
            if (!logs) return;
            todayWorkout.exercises.forEach((ex, i) => {
                const saved = logs.find(l => l.exercise_name === ex.name && l.completed);
                if (saved) document.getElementById('check_' + i).checked = true;
            });
        });
    }
}

async function saveWorkoutCheck(exerciseName, completed) {
    if (!authToken) return;
    await apiFetch('/workout-logs', {
        method: 'POST',
        body: JSON.stringify({ exercise_name: exerciseName, completed: completed })
    });
}

renderChecklist('beginner');
