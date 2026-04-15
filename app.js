// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (!target) return;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 16);
    });
}

const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.3 });

const statsEl = document.querySelector('.stats-strip');
if (statsEl) statsObserver.observe(statsEl);

// ===== CALORIE CALCULATOR =====
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

    // Goal adjustment
    const goalAdjustments = {
        'lose-fast': -1000,
        'lose': -500,
        'maintain': 0,
        'gain': 500,
        'gain-fast': 1000
    };
    let dailyCal = Math.round(tdee + goalAdjustments[goal]);

    // Minimum calorie floor
    const minCal = gender === 'male' ? 1500 : 1200;
    dailyCal = Math.max(dailyCal, minCal);

    // BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let bmiCat;
    if (bmi < 18.5) bmiCat = 'Kurus';
    else if (bmi < 25) bmiCat = 'Normal';
    else if (bmi < 30) bmiCat = 'Overweight';
    else bmiCat = 'Obesitas';

    // Macros
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

    // Water needs
    const waterL = (weight * 0.035).toFixed(1);
    const waterGlasses = Math.round((waterL * 1000) / 250);

    // Time estimate
    let timeWeeks = null;
    if (targetWeight && targetWeight !== weight) {
        const diff = Math.abs(weight - targetWeight);
        const weeklyRate = Math.abs(goalAdjustments[goal]) * 7 / 7700;
        if (weeklyRate > 0) timeWeeks = Math.ceil(diff / weeklyRate);
    }

    // Display results
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

// ===== MEAL PLANS =====
const mealPlans = {
    1500: [
        { time: '07:00', label: 'Sarapan', name: 'Oatmeal + Telur Rebus', desc: 'Oatmeal 40g dengan pisang iris, 2 telur rebus, teh hijau tanpa gula.', cal: 350 },
        { time: '10:00', label: 'Snack', name: 'Buah & Yogurt', desc: 'Greek yogurt 100g rendah lemak dengan 1 buah apel.', cal: 150 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi Merah + Dada Ayam', desc: 'Nasi merah 100g, dada ayam panggang 120g, tumis brokoli wortel, sup sayur.', cal: 450 },
        { time: '15:30', label: 'Snack', name: 'Kacang Almond', desc: 'Almond panggang 15 butir (sekitar 20g) dan 1 buah jeruk.', cal: 150 },
        { time: '18:30', label: 'Makan Malam', name: 'Ikan Panggang + Sayur', desc: 'Ikan kakap panggang 150g, salad sayuran segar dengan dressing lemon, ubi rebus 100g.', cal: 400 }
    ],
    1800: [
        { time: '07:00', label: 'Sarapan', name: 'Roti Gandum + Telur Orak-Arik', desc: 'Roti gandum 2 lembar, telur orak-arik 2 butir dengan sayuran, segelas susu rendah lemak.', cal: 420 },
        { time: '10:00', label: 'Snack', name: 'Smoothie Buah', desc: 'Smoothie pisang + bayam + susu almond 250ml, 1 sendok selai kacang.', cal: 200 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Ayam Teriyaki', desc: 'Nasi putih 150g, ayam teriyaki homemade 150g, capcay sayuran, tempe goreng 2 potong.', cal: 550 },
        { time: '15:30', label: 'Snack', name: 'Roti + Selai Kacang', desc: 'Roti gandum 1 lembar dengan selai kacang 1 sdm, pisang 1 buah.', cal: 200 },
        { time: '18:30', label: 'Makan Malam', name: 'Sup Ayam + Tahu', desc: 'Sup ayam sayuran lengkap, tahu kukus 2 potong, nasi merah 100g.', cal: 430 }
    ],
    2000: [
        { time: '07:00', label: 'Sarapan', name: 'Nasi Goreng Sehat', desc: 'Nasi merah goreng 150g dengan telur, sayuran, dan ayam suwir. Jus jeruk segar.', cal: 480 },
        { time: '10:00', label: 'Snack', name: 'Granola Bar + Buah', desc: 'Homemade granola bar 1 buah, pisang 1 buah, teh hijau.', cal: 250 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Ikan Bakar', desc: 'Nasi putih 150g, ikan bakar bumbu padang 200g, lalapan + sambal, sayur asem.', cal: 600 },
        { time: '15:30', label: 'Snack', name: 'Ubi Rebus + Kacang', desc: 'Ubi jalar rebus 150g, edamame rebus 50g.', cal: 220 },
        { time: '18:30', label: 'Makan Malam', name: 'Steak Tempe + Salad', desc: 'Tempe steak 200g, salad besar dengan olive oil dressing, jagung rebus 1 buah.', cal: 450 }
    ],
    2500: [
        { time: '07:00', label: 'Sarapan', name: 'Pancake Oat + Telur', desc: 'Pancake oat 3 lembar dengan madu, 3 telur orak-arik, pisang, susu coklat rendah gula.', cal: 600 },
        { time: '10:00', label: 'Snack', name: 'Roti + Alpukat + Telur', desc: 'Roti gandum 2 lembar, alpukat 1/2 buah, telur rebus 1 butir.', cal: 350 },
        { time: '12:30', label: 'Makan Siang', name: 'Nasi + Rendang + Sayur', desc: 'Nasi putih 200g, rendang daging 150g, tumis kangkung, tahu goreng 2 potong, kerupuk.', cal: 700 },
        { time: '15:30', label: 'Snack', name: 'Protein Smoothie', desc: 'Smoothie pisang + oat + selai kacang + susu 350ml.', cal: 350 },
        { time: '18:30', label: 'Makan Malam', name: 'Ayam Panggang + Nasi', desc: 'Paha ayam panggang 200g, nasi merah 150g, sup sayuran, tempe bacem 2 potong.', cal: 500 }
    ]
};

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

// ===== WORKOUT SCHEDULE =====
const workouts = {
    beginner: [
        {
            day: 'Senin', focus: 'Full Body',
            exercises: [
                { name: 'Jumping Jacks', detail: '3 x 20 rep' },
                { name: 'Wall Push-up', detail: '3 x 10 rep' },
                { name: 'Bodyweight Squat', detail: '3 x 12 rep' },
                { name: 'Knee Plank', detail: '3 x 20 detik' },
                { name: 'Glute Bridge', detail: '3 x 12 rep' },
                { name: 'Standing Calf Raise', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Kardio Ringan',
            exercises: [
                { name: 'Jalan Cepat di Tempat', detail: '5 menit' },
                { name: 'March in Place (Lutut Tinggi)', detail: '3 x 30 detik' },
                { name: 'Step Touch Side to Side', detail: '3 x 1 menit' },
                { name: 'Standing Knee to Elbow', detail: '3 x 10/sisi' },
                { name: 'Arm Circles', detail: '2 x 30 detik' },
                { name: 'Cool Down Stretching', detail: '5 menit' }
            ]
        },
        { day: 'Rabu', focus: 'Istirahat', rest: true },
        {
            day: 'Kamis', focus: 'Upper Body',
            exercises: [
                { name: 'Incline Push-up (Meja)', detail: '3 x 10 rep' },
                { name: 'Tricep Dips (Kursi)', detail: '3 x 8 rep' },
                { name: 'Arm Circles', detail: '3 x 30 detik' },
                { name: 'Superman Hold', detail: '3 x 15 detik' },
                { name: 'Wall Angels', detail: '3 x 10 rep' },
                { name: 'Plank Shoulder Tap', detail: '3 x 8/sisi' }
            ]
        },
        {
            day: 'Jumat', focus: 'Lower Body',
            exercises: [
                { name: 'Bodyweight Squat', detail: '3 x 15 rep' },
                { name: 'Lunges', detail: '3 x 10/kaki' },
                { name: 'Glute Bridge', detail: '3 x 15 rep' },
                { name: 'Calf Raise', detail: '3 x 20 rep' },
                { name: 'Wall Sit', detail: '3 x 20 detik' },
                { name: 'Side Lying Leg Raise', detail: '3 x 12/sisi' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Kardio + Core',
            exercises: [
                { name: 'Jumping Jacks', detail: '3 x 30 rep' },
                { name: 'High Knees', detail: '3 x 20 detik' },
                { name: 'Mountain Climber (Pelan)', detail: '3 x 10/sisi' },
                { name: 'Bicycle Crunch', detail: '3 x 10/sisi' },
                { name: 'Dead Bug', detail: '3 x 8/sisi' },
                { name: 'Plank Hold', detail: '3 x 20 detik' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    intermediate: [
        {
            day: 'Senin', focus: 'Push (Dada/Bahu/Trisep)',
            exercises: [
                { name: 'Push-up Standar', detail: '4 x 15 rep' },
                { name: 'Diamond Push-up', detail: '3 x 10 rep' },
                { name: 'Decline Push-up', detail: '3 x 12 rep' },
                { name: 'Pike Push-up', detail: '3 x 10 rep' },
                { name: 'Tricep Dips', detail: '3 x 12 rep' },
                { name: 'Plank to Push-up', detail: '3 x 8 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Pull (Punggung/Bisep)',
            exercises: [
                { name: 'Superman', detail: '4 x 15 rep' },
                { name: 'Reverse Snow Angel', detail: '3 x 12 rep' },
                { name: 'Towel Rows (Pakai Handuk)', detail: '3 x 12 rep' },
                { name: 'Prone Y-T-W Raises', detail: '3 x 8 rep' },
                { name: 'Doorway Curls', detail: '3 x 10 rep' },
                { name: 'Plank Row (Tanpa Beban)', detail: '3 x 10/sisi' }
            ]
        },
        {
            day: 'Rabu', focus: 'HIIT Kardio',
            exercises: [
                { name: 'Burpees', detail: '4 x 8 rep' },
                { name: 'Jump Squat', detail: '4 x 12 rep' },
                { name: 'Mountain Climbers', detail: '4 x 20 rep' },
                { name: 'High Knees', detail: '4 x 30 detik' },
                { name: 'Skater Jumps', detail: '3 x 12/sisi' },
                { name: 'Plank Jacks', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Kamis', focus: 'Legs & Glutes',
            exercises: [
                { name: 'Jump Squat', detail: '4 x 12 rep' },
                { name: 'Bulgarian Split Squat', detail: '3 x 10/kaki' },
                { name: 'Sumo Squat', detail: '4 x 15 rep' },
                { name: 'Single Leg Glute Bridge', detail: '3 x 12/kaki' },
                { name: 'Curtsy Lunge', detail: '3 x 10/kaki' },
                { name: 'Wall Sit Hold', detail: '3 x 45 detik' }
            ]
        },
        {
            day: 'Jumat', focus: 'Core & Abs',
            exercises: [
                { name: 'Plank Hold', detail: '3 x 45 detik' },
                { name: 'Bicycle Crunch', detail: '4 x 20 rep' },
                { name: 'Leg Raises', detail: '3 x 12 rep' },
                { name: 'Russian Twist', detail: '3 x 15/sisi' },
                { name: 'Mountain Climber Cross', detail: '3 x 12/sisi' },
                { name: 'Hollow Body Hold', detail: '3 x 20 detik' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Active Recovery',
            exercises: [
                { name: 'Jalan Kaki 30 Menit', detail: 'Santai' },
                { name: 'Yoga Stretching', detail: '15 menit' },
                { name: 'Foam Rolling (Opsional)', detail: '10 menit' },
                { name: 'Deep Breathing Exercise', detail: '5 menit' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ],
    advanced: [
        {
            day: 'Senin', focus: 'Push Power',
            exercises: [
                { name: 'Clap Push-up', detail: '4 x 10 rep' },
                { name: 'Archer Push-up', detail: '3 x 8/sisi' },
                { name: 'Decline Diamond Push-up', detail: '3 x 12 rep' },
                { name: 'Pike Push-up (Elevated)', detail: '4 x 10 rep' },
                { name: 'Hindu Push-up', detail: '3 x 12 rep' },
                { name: 'Pseudo Planche Push-up', detail: '3 x 8 rep' },
                { name: 'Tricep Dips (Deep)', detail: '3 x 15 rep' }
            ]
        },
        {
            day: 'Selasa', focus: 'Legs Explosive',
            exercises: [
                { name: 'Pistol Squat (Assisted)', detail: '4 x 6/kaki' },
                { name: 'Jump Lunge', detail: '4 x 12 rep' },
                { name: 'Box Jump (Kursi Rendah)', detail: '4 x 10 rep' },
                { name: 'Single Leg Deadlift', detail: '3 x 10/kaki' },
                { name: 'Sumo Squat Pulse', detail: '3 x 20 rep' },
                { name: 'Nordic Curl (Assisted)', detail: '3 x 6 rep' },
                { name: 'Calf Raise (Single Leg)', detail: '3 x 15/kaki' }
            ]
        },
        {
            day: 'Rabu', focus: 'HIIT Extreme',
            exercises: [
                { name: 'Burpee + Tuck Jump', detail: '5 x 8 rep' },
                { name: 'Mountain Climbers Sprint', detail: '5 x 30 detik' },
                { name: 'Jump Squat 180', detail: '4 x 10 rep' },
                { name: 'Plank to Squat Jump', detail: '4 x 8 rep' },
                { name: 'Spider-Man Push-up', detail: '3 x 8/sisi' },
                { name: 'Lateral Bound', detail: '4 x 10/sisi' }
            ]
        },
        {
            day: 'Kamis', focus: 'Pull & Back',
            exercises: [
                { name: 'Australian Pull-up (Meja)', detail: '4 x 12 rep' },
                { name: 'Towel Rows (Explosive)', detail: '4 x 12 rep' },
                { name: 'Superman Pulse', detail: '4 x 20 rep' },
                { name: 'Reverse Plank', detail: '3 x 30 detik' },
                { name: 'Prone Y Raise', detail: '3 x 12 rep' },
                { name: 'Door Frame Rows', detail: '3 x 10 rep' },
                { name: 'Back Extension Hold', detail: '3 x 20 detik' }
            ]
        },
        {
            day: 'Jumat', focus: 'Core Crusher',
            exercises: [
                { name: 'L-Sit Hold (Kursi)', detail: '4 x 15 detik' },
                { name: 'Dragon Flag (Assisted)', detail: '3 x 6 rep' },
                { name: 'Ab Wheel Rollout (Handuk)', detail: '3 x 10 rep' },
                { name: 'Hanging Knee Raise', detail: '4 x 12 rep' },
                { name: 'Plank (Arms Extended)', detail: '3 x 45 detik' },
                { name: 'V-Up', detail: '3 x 15 rep' },
                { name: 'Side Plank + Rotation', detail: '3 x 10/sisi' }
            ]
        },
        {
            day: 'Sabtu', focus: 'Full Body Circuit',
            exercises: [
                { name: 'Burpees', detail: '5 x 10 rep' },
                { name: 'Push-up Variations', detail: '4 x 15 rep' },
                { name: 'Jump Squat', detail: '4 x 15 rep' },
                { name: 'Mountain Climbers', detail: '4 x 30 detik' },
                { name: 'Plank to Push-up', detail: '4 x 10 rep' },
                { name: 'Squat Hold Pulse', detail: '3 x 30 detik' }
            ]
        },
        { day: 'Minggu', focus: 'Istirahat', rest: true }
    ]
};

let currentLevel = 'beginner';

function renderWorkout(level) {
    const container = document.getElementById('workoutWeek');
    const week = workouts[level];
    container.innerHTML = week.map(day => {
        if (day.rest) {
            return `
                <div class="workout-day rest-day">
                    <div class="day-header">
                        <span class="day-name">${day.day}</span>
                        <span class="day-focus">${day.focus}</span>
                    </div>
                    <div class="rest-message">
                        <span class="rest-icon">&#128564;</span>
                        Hari istirahat. Fokus pada recovery, stretching ringan, dan hidrasi yang cukup.
                    </div>
                </div>`;
        }
        return `
            <div class="workout-day">
                <div class="day-header">
                    <span class="day-name">${day.day}</span>
                    <span class="day-focus">${day.focus}</span>
                </div>
                <div class="day-exercises">
                    ${day.exercises.map(ex => `
                        <div class="exercise-item">
                            <span class="exercise-name">${ex.name}</span>
                            <span class="exercise-detail">${ex.detail}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join('');

    renderChecklist(level);
}

document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.level;
        renderWorkout(currentLevel);
    });
});

renderWorkout('beginner');

// ===== TRACKER =====
let foodEntries = [];

window.addFood = function() {
    const input = document.getElementById('foodInput');
    const val = parseInt(input.value);
    if (!val || val <= 0) return;

    foodEntries.push(val);
    input.value = '';
    renderFoodLog();
};

document.getElementById('foodInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') window.addFood();
});

function renderFoodLog() {
    const log = document.getElementById('foodLog');
    log.innerHTML = foodEntries.map((cal, i) => `
        <div class="food-entry">
            <span>Makanan ${i + 1}: ${cal} kkal</span>
            <button class="remove-btn" onclick="removeFood(${i})">&#10005;</button>
        </div>
    `).join('');

    const total = foodEntries.reduce((a, b) => a + b, 0);
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

window.removeFood = function(index) {
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

let waterFilled = 0;

function toggleWater(index) {
    const glasses = document.querySelectorAll('.water-glass');
    if (index + 1 === waterFilled) {
        waterFilled = index;
    } else {
        waterFilled = index + 1;
    }
    glasses.forEach((g, i) => g.classList.toggle('filled', i < waterFilled));
    document.getElementById('waterCount').textContent = waterFilled;
}

renderWaterTracker();

// Workout Checklist
function renderChecklist(level) {
    const container = document.getElementById('workoutChecklist');
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
                <input type="checkbox" id="check_${i}">
                ${ex.name} (${ex.detail})
            </label>
        `).join('');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
