// ===== COMMON / SHARED: API base, auth token, navbar, auth flows =====
// TDZ-safe: declare these at the very top before any code references them.
const API_BASE = '/api';
let authToken = localStorage.getItem('nourish_token');
let currentUser = null;

// *** IMPORTANT: Replace with your own Google Client ID ***
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// ===== API HELPER =====
async function apiFetch(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    const res = await fetch(API_BASE + endpoint, { ...options, headers });
    if (res.status === 401) {
        authToken = null;
        localStorage.removeItem('nourish_token');
        handleLogout();
        return null;
    }
    return res;
}

// ===== NAVBAR =====
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
});

// ===== AUTH MODAL CONTROLS =====
function openAuth(mode) {
    const overlay = document.getElementById('authOverlay');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    switchAuth(mode);
    clearAuthMessages();
}

function closeAuth() {
    document.getElementById('authOverlay').classList.remove('show');
    document.body.style.overflow = '';
    clearAuthMessages();
}

function closeAuthIfOutside(e) {
    if (e.target === document.getElementById('authOverlay')) closeAuth();
}

function switchAuth(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const switchEl = document.getElementById('authSwitch');
    clearAuthMessages();

    if (mode === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        title.textContent = 'Buat Akun Baru';
        subtitle.textContent = 'Bergabung dan mulai program diet Anda';
        switchEl.innerHTML = 'Sudah punya akun? <a onclick="switchAuth(\'login\')">Masuk di sini</a>';
    } else {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        title.textContent = 'Masuk ke Akun';
        subtitle.textContent = 'Mulai perjalanan sehat Anda bersama kami';
        switchEl.innerHTML = 'Belum punya akun? <a onclick="switchAuth(\'register\')">Daftar di sini</a>';
    }
}

function clearAuthMessages() {
    const err = document.getElementById('authError');
    const suc = document.getElementById('authSuccess');
    if (err) { err.classList.remove('show'); err.textContent = ''; }
    if (suc) { suc.classList.remove('show'); suc.textContent = ''; }
}

function showAuthError(msg) {
    const el = document.getElementById('authError');
    el.textContent = msg;
    el.classList.add('show');
}

function showAuthSuccess(msg) {
    const el = document.getElementById('authSuccess');
    el.textContent = msg;
    el.classList.add('show');
}

// ===== GOOGLE SIGN-IN =====
function initGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) return;
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true
    });
}

function handleGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) {
        showAuthError('Google API sedang dimuat. Coba lagi dalam beberapa detik, atau gunakan email/password.');
        return;
    }
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: 'email profile',
                callback: (response) => {
                    if (response.access_token) {
                        fetchGoogleProfile(response.access_token);
                    }
                }
            }).requestAccessToken();
        }
    });
}

async function handleGoogleCallback(response) {
    const payload = parseJwt(response.credential);
    if (!payload) return;
    await googleLoginFlow({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture
    });
}

function fetchGoogleProfile(token) {
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: 'Bearer ' + token }
    })
    .then(r => r.json())
    .then(data => googleLoginFlow({
        name: data.name, email: data.email, avatar: data.picture
    }))
    .catch(() => showAuthError('Gagal mengambil profil Google.'));
}

async function googleLoginFlow(profile) {
    try {
        const res = await fetch(API_BASE + '/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });
        const data = await res.json();
        if (!res.ok) {
            showAuthError(data.error || 'Gagal masuk dengan Google.');
            return;
        }
        authToken = data.token;
        localStorage.setItem('nourish_token', authToken);
        loginUser(data.user);
        await hydrateUserData();
    } catch (err) {
        showAuthError('Tidak dapat terhubung ke server.');
    }
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')));
    } catch (e) { return null; }
}

// ===== EMAIL LOGIN / REGISTER =====
async function handleEmailLogin(e) {
    e.preventDefault();
    clearAuthMessages();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(API_BASE + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            showAuthError(data.error || 'Login gagal.');
            return;
        }

        authToken = data.token;
        localStorage.setItem('nourish_token', authToken);
        loginUser(data.user);
        await hydrateUserData();
    } catch (err) {
        showAuthError('Tidak dapat terhubung ke server.');
    }
}

async function handleEmailRegister(e) {
    e.preventDefault();
    clearAuthMessages();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    if (password !== confirm) {
        showAuthError('Password tidak cocok. Silakan periksa kembali.');
        return;
    }
    if (password.length < 8) {
        showAuthError('Password minimal 8 karakter.');
        return;
    }

    try {
        const res = await fetch(API_BASE + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            showAuthError(data.error || 'Pendaftaran gagal.');
            return;
        }

        authToken = data.token;
        localStorage.setItem('nourish_token', authToken);
        showAuthSuccess('Akun berhasil dibuat! Mengalihkan...');
        setTimeout(() => {
            loginUser(data.user);
        }, 800);
    } catch (err) {
        showAuthError('Tidak dapat terhubung ke server.');
    }
}

function loginUser(user) {
    currentUser = user;
    showLoggedInState(user);
    closeAuth();
}

function showLoggedInState(user) {
    document.getElementById('navAuth').style.display = 'none';
    const navUser = document.getElementById('navUser');
    navUser.style.display = 'flex';

    document.getElementById('navUserName').textContent = user.name.split(' ')[0];
    document.getElementById('dropdownName').textContent = user.name;
    document.getElementById('dropdownEmail').textContent = user.email;

    const avatar = document.getElementById('navUserAvatar');
    if (user.avatar) {
        avatar.src = user.avatar;
    } else {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const canvas = document.createElement('canvas');
        canvas.width = 80; canvas.height = 80;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#8B9D77';
        ctx.fillRect(0, 0, 80, 80);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 32px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, 40, 40);
        avatar.src = canvas.toDataURL();
    }
}

function toggleDropdown() {
    document.getElementById('userDropdown').classList.toggle('show');
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const avatar = document.getElementById('navUserAvatar');
    if (dropdown && !dropdown.contains(e.target) && e.target !== avatar) {
        dropdown.classList.remove('show');
    }
});

async function handleLogout() {
    if (authToken) {
        try { await apiFetch('/logout', { method: 'POST' }); } catch (e) {}
    }
    currentUser = null;
    authToken = null;
    localStorage.removeItem('nourish_token');

    // Reset tracker state if on tracker page
    if (typeof foodEntries !== 'undefined') {
        foodEntries = [];
        if (typeof renderFoodLog === 'function') renderFoodLog();
    }
    if (typeof waterFilled !== 'undefined') {
        waterFilled = 0;
        document.querySelectorAll('.water-glass').forEach(g => g.classList.remove('filled'));
        const wc = document.getElementById('waterCount');
        if (wc) wc.textContent = '0';
    }

    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const dropdown = document.getElementById('userDropdown');
    if (navAuth) navAuth.style.display = 'flex';
    if (navUser) navUser.style.display = 'none';
    if (dropdown) dropdown.classList.remove('show');

    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.disableAutoSelect();
    }
}

// ===== HYDRATE USER DATA (shared across pages) =====
async function hydrateUserData() {
    if (!authToken) return;

    // Food logs for today (only if tracker page present)
    if (document.getElementById('foodLog')) {
        const foodRes = await apiFetch('/food-logs');
        if (foodRes && foodRes.ok) {
            const logs = await foodRes.json();
            if (typeof foodEntries !== 'undefined') {
                foodEntries = logs.map(l => ({ id: l.id, calories: l.calories }));
                if (typeof renderFoodLog === 'function') renderFoodLog();
            }
        }
    }

    // Water log for today
    if (document.getElementById('waterTracker')) {
        const waterRes = await apiFetch('/water-logs');
        if (waterRes && waterRes.ok) {
            const data = await waterRes.json();
            if (typeof waterFilled !== 'undefined') {
                waterFilled = data.glasses || 0;
                const glasses = document.querySelectorAll('.water-glass');
                glasses.forEach((g, i) => g.classList.toggle('filled', i < waterFilled));
                const wc = document.getElementById('waterCount');
                if (wc) wc.textContent = waterFilled;
            }
        }
    }

    // Calorie profile (latest) — used by tracker's ring target
    const profRes = await apiFetch('/calorie-profile');
    if (profRes && profRes.ok) {
        const prof = await profRes.json();
        if (prof && prof.daily_calories) {
            window.dailyCalorieTarget = prof.daily_calories;
            if (typeof renderFoodLog === 'function' && document.getElementById('foodLog')) {
                renderFoodLog();
            }
        }
    }
}

// ===== STAT COUNTER ANIMATION (used on home) =====
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

// ===== BOOTSTRAP =====
window.addEventListener('load', async () => {
    // Init Google Sign-In
    setTimeout(initGoogleSignIn, 500);

    // Restore session from token
    if (authToken) {
        const res = await apiFetch('/me');
        if (res && res.ok) {
            const data = await res.json();
            currentUser = data.user;
            showLoggedInState(currentUser);
            await hydrateUserData();
        }
    }

    // Animate stats strip if present
    const statsEl = document.querySelector('.stats-strip');
    if (statsEl) {
        const statsObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
        }, { threshold: 0.3 });
        statsObserver.observe(statsEl);
    }
});

// Escape key closes modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAuth();
        if (typeof closeRecipe === 'function') closeRecipe();
    }
});
