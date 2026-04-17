// ===== MENU DIET GRID + RECIPE MODAL =====
// Requires: common.js, data.js (menuDietData).

let activeFilter = 'all';
let activeType = 'all';

function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    let filtered = menuDietData;
    if (activeFilter !== 'all') filtered = filtered.filter(m => m.meal === activeFilter);
    if (activeType !== 'all') filtered = filtered.filter(m => m.type === activeType);

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results" style="grid-column:1/-1">
            <span class="no-icon">🍽️</span>
            <h3>Tidak Ada Menu</h3>
            <p>Coba kombinasi filter yang berbeda untuk menemukan menu yang sesuai.</p>
        </div>`;
        return;
    }

    grid.innerHTML = filtered.map(m => {
        const typeLabels = { 'low-carb': 'Low Carb', 'high-protein': 'High Protein', 'vegetarian': 'Vegetarian', 'low-fat': 'Low Fat', 'balanced': 'Balanced' };
        const mealLabels = { 'sarapan': 'Sarapan', 'siang': 'Makan Siang', 'malam': 'Makan Malam', 'snack': 'Snack' };
        return `
        <div class="menu-card" onclick="openRecipe(${m.id})">
            <div class="menu-card-img" style="background:${m.bg}">
                ${m.emoji}
                <div class="menu-card-badges">
                    <span class="menu-badge meal-type">${mealLabels[m.meal]}</span>
                    <span class="menu-badge diet-type">${typeLabels[m.type]}</span>
                </div>
                <div class="menu-card-cal">${m.cal} kkal</div>
            </div>
            <div class="menu-card-body">
                <h4>${m.name}</h4>
                <p>${m.desc}</p>
                <div class="menu-card-macros">
                    <span class="menu-macro-item">P <span>${m.protein}g</span></span>
                    <span class="menu-macro-item">K <span>${m.carbs}g</span></span>
                    <span class="menu-macro-item">L <span>${m.fat}g</span></span>
                    <span class="menu-macro-item">S <span>${m.fiber}g</span></span>
                </div>
                <div class="menu-card-footer">
                    <span class="menu-prep-time">&#9201; ${m.prep}</span>
                    <span class="menu-view-btn">Lihat Resep</span>
                </div>
            </div>
        </div>`;
    }).join('');
}

document.getElementById('mealFilters').addEventListener('click', e => {
    const btn = e.target.closest('.diet-filter-btn');
    if (!btn) return;
    document.querySelectorAll('.diet-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderMenuGrid();
});

document.getElementById('dietTypeFilters').addEventListener('click', e => {
    const btn = e.target.closest('.diet-type-btn');
    if (!btn) return;
    document.querySelectorAll('.diet-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.type;
    renderMenuGrid();
});

function openRecipe(id) {
    const m = menuDietData.find(x => x.id === id);
    if (!m) return;

    const typeLabels = { 'low-carb': 'Low Carb', 'high-protein': 'High Protein', 'vegetarian': 'Vegetarian', 'low-fat': 'Low Fat', 'balanced': 'Balanced' };
    const mealLabels = { 'sarapan': 'Sarapan', 'siang': 'Makan Siang', 'malam': 'Makan Malam', 'snack': 'Snack' };

    const hero = document.getElementById('recipeHero');
    hero.style.background = m.bg;
    hero.childNodes[0].textContent = m.emoji;

    document.getElementById('recipeHeroBadges').innerHTML =
        `<span class="recipe-hero-badge">${mealLabels[m.meal]}</span>` +
        `<span class="recipe-hero-badge">${typeLabels[m.type]}</span>` +
        `<span class="recipe-hero-badge">&#9201; ${m.prep}</span>`;

    document.getElementById('recipeBody').innerHTML = `
        <h2>${m.name}</h2>
        <p class="recipe-desc">${m.desc}</p>

        <div class="recipe-stats">
            <div class="recipe-stat">
                <div class="recipe-stat-value cal-value">${m.cal}</div>
                <div class="recipe-stat-label">Kalori</div>
            </div>
            <div class="recipe-stat">
                <div class="recipe-stat-value protein-value">${m.protein}g</div>
                <div class="recipe-stat-label">Protein</div>
            </div>
            <div class="recipe-stat">
                <div class="recipe-stat-value carb-value">${m.carbs}g</div>
                <div class="recipe-stat-label">Karbo</div>
            </div>
            <div class="recipe-stat">
                <div class="recipe-stat-value fat-value">${m.fat}g</div>
                <div class="recipe-stat-label">Lemak</div>
            </div>
        </div>

        <div class="recipe-section-title">&#129382; Bahan-Bahan</div>
        <div class="recipe-ingredients">
            ${m.ingredients.map(i => `<div class="recipe-ingredient">${i}</div>`).join('')}
        </div>

        <div class="recipe-section-title">&#128073; Langkah Memasak</div>
        <div class="recipe-steps">
            ${m.steps.map((s, i) => `
                <div class="recipe-step">
                    <div class="recipe-step-num">${i + 1}</div>
                    <p>${s}</p>
                </div>
            `).join('')}
        </div>

        <div class="recipe-tip">
            <strong>&#128161; Tips dari Trainer:</strong> ${m.tip}
        </div>
    `;

    document.getElementById('recipeOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeRecipe() {
    const overlay = document.getElementById('recipeOverlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

function closeRecipeIfOutside(e) {
    if (e.target === document.getElementById('recipeOverlay')) closeRecipe();
}

renderMenuGrid();
