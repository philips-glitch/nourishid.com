// ===== CALORIE CALCULATOR + MEAL PLAN TABS =====
// Requires: common.js (authToken, apiFetch), data.js (mealPlans).

const calorieForm = document.getElementById('calorieForm');

calorieForm.addEventListener('submit', e => {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const targetWeight = parseFloat(document.getElementById('targetWeight').value) || null;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    if (!age || !height || !weight || !activity || !goal) return;

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;

    const goalAdjustments = {
        'lose-fast': -1000,
        'lose': -500,
        'maintain': 0,
        'gain': 500,
        'gain-fast': 1000
    };
    let dailyCal = Math.round(tdee + goalAdjustments[goal]);

    const minCal = gender === 'male' ? 1500 : 1200;
    dailyCal = Math.max(dailyCal, minCal);

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let bmiCat;
    if (bmi < 18.5) bmiCat = 'Kurus';
    else if (bmi < 25) bmiCat = 'Normal';
    else if (bmi < 30) bmiCat = 'Overweight';
    else bmiCat = 'Obesitas';

    let proteinPct, carbsPct, fatsPct;
    if (goal === 'lose-fast' || goal === 'lose') {
        proteinPct = 0.35; carbsPct = 0.35; fatsPct = 0.30;
    } else if (goal === 'maintain') {
        proteinPct = 0.30; carbsPct = 0.40; fatsPct = 0.30;
    } else {
        proteinPct = 0.30; carbsPct = 0.45; fatsPct = 0.25;
    }

    const proteinG = Math.round((dailyCal * proteinPct) / 4);
    const carbsG = Math.round((dailyCal * carbsPct) / 4);
    const fatsG = Math.round((dailyCal * fatsPct) / 9);

    const waterL = (weight * 0.035).toFixed(1);
    const waterGlasses = Math.round((waterL * 1000) / 250);

    let timeWeeks = null;
    if (targetWeight && targetWeight !== weight) {
        const diff = Math.abs(weight - targetWeight);
        const weeklyRate = Math.abs(goalAdjustments[goal]) * 7 / 7700;
        if (weeklyRate > 0) timeWeeks = Math.ceil(diff / weeklyRate);
    }

    document.getElementById('resultPlaceholder').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';

    animateNumber('dailyCalories', dailyCal);
    document.getElementById('bmrValue').textContent = Math.round(bmr) + ' kkal';
    document.getElementById('tdeeValue').textContent = Math.round(tdee) + ' kkal';
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = bmiCat;

    const timeEl = document.getElementById('timeEstimate');
    if (timeWeeks) {
        timeEl.style.display = 'flex';
        const months = Math.floor(timeWeeks / 4);
        const weeks = timeWeeks % 4;
        let timeStr = '';
        if (months > 0) timeStr += months + ' bulan ';
        if (weeks > 0) timeStr += weeks + ' minggu';
        document.getElementById('timeValue').textContent = timeStr.trim();
    } else {
        timeEl.style.display = 'none';
    }

    document.getElementById('proteinValue').textContent = proteinG + 'g';
    document.getElementById('carbsValue').textContent = carbsG + 'g';
    document.getElementById('fatsValue').textContent = fatsG + 'g';
    document.getElementById('proteinPercent').textContent = Math.round(proteinPct * 100) + '%';
    document.getElementById('carbsPercent').textContent = Math.round(carbsPct * 100) + '%';
    document.getElementById('fatsPercent').textContent = Math.round(fatsPct * 100) + '%';

    setTimeout(() => {
        document.getElementById('proteinBar').style.width = (proteinPct * 100) + '%';
        document.getElementById('carbsBar').style.width = (carbsPct * 100) + '%';
        document.getElementById('fatsBar').style.width = (fatsPct * 100) + '%';
    }, 100);

    document.getElementById('waterValue').textContent = waterL;
    document.getElementById('waterGlasses').textContent = waterGlasses;

    window.dailyCalorieTarget = dailyCal;

    if (authToken) {
        apiFetch('/calorie-profile', {
            method: 'POST',
            body: JSON.stringify({
                gender, age, height, weight, target_weight: targetWeight,
                activity, goal, bmr: Math.round(bmr), tdee: Math.round(tdee),
                daily_calories: dailyCal, bmi: parseFloat(bmi.toFixed(1)),
                protein_g: proteinG, carbs_g: carbsG, fats_g: fatsG
            })
        });
    }

    document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function animateNumber(id, target) {
    const el = document.getElementById(id);
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.round(current);
    }, 16);
}

// ===== MEAL PLAN TABS =====
function renderMealPlan(calories) {
    const timeline = document.getElementById('mealTimeline');
    const plan = mealPlans[calories];
    timeline.innerHTML = plan.map(meal => `
        <div class="meal-item">
            <div class="meal-time">
                <div class="meal-time-label">${meal.label}</div>
                <div class="meal-time-value">${meal.time}</div>
            </div>
            <div class="meal-info">
                <h4>${meal.name}</h4>
                <p>${meal.desc}</p>
                <span class="meal-calories">${meal.cal} kkal</span>
            </div>
        </div>
    `).join('');
}

document.querySelectorAll('.meal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.meal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderMealPlan(parseInt(tab.dataset.calories));
    });
});

renderMealPlan(1500);
