// ===== WORKOUT SCHEDULE RENDERER =====
// Requires: common.js, data.js (workoutPrograms).

let currentCategory = 'home';
let currentLevel = 'beginner';

function renderWorkout(category, level) {
    const container = document.getElementById('workoutWeek');
    if (!container) return;
    const program = (workoutPrograms[category] || workoutPrograms.home);
    const week = program[level] || program.beginner;
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
}

// Category selector
document.querySelectorAll('.level-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.level-btn[data-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderWorkout(currentCategory, currentLevel);
    });
});

// Level selector
document.querySelectorAll('.level-btn[data-level]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.level-btn[data-level]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.level;
        renderWorkout(currentCategory, currentLevel);
    });
});

renderWorkout(currentCategory, currentLevel);
