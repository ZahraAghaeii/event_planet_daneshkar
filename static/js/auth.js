const AUTH_API = '/api/auth/';

function showAuthModal(type = 'login') {
    document.getElementById('authModal').style.display = 'flex';
    switchAuthTab(type);
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthTab(type) {
    if (type === 'login') {
        document.getElementById('loginFormSection').style.display = 'block';
        document.getElementById('signupFormSection').style.display = 'none';
    } else {
        document.getElementById('loginFormSection').style.display = 'none';
        document.getElementById('signupFormSection').style.display = 'block';
    }
}

// ورود به سیستم
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${AUTH_API}login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            alert('با موفقیت وارد شدید! 🎉');
            closeAuthModal();
            checkUserAuth();
        } else {
            alert('نام کاربری یا رمز عبور اشتباه است.');
        }
    } catch (err) {
        alert('خطای شبکه رخ داده است.');
    }
}

// ثبت‌نام کاربر با انتخاب نقش
async function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm').value;
    const role = document.getElementById('signupRole').value;

    if (password !== confirmPassword) {
        alert('رمز عبور و تکرار آن یکسان نیستند.');
        return;
    }

    try {
        const response = await fetch(`${AUTH_API}register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, role })
        });

        if (response.ok) {
            alert('ثبت‌نام با موفقیت انجام شد. اکنون وارد شوید.');
            switchAuthTab('login');
        } else {
            const data = await response.json();
            alert(JSON.stringify(data));
        }
    } catch (err) {
        alert('خطا در ثبت‌نام.');
    }
}

// بررسی وضعیت لاگین
async function checkUserAuth() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        document.getElementById('navAuth').style.display = 'block';
        document.getElementById('navUser').style.display = 'none';
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}profile/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const user = await res.json();
            document.getElementById('navAuth').style.display = 'none';
            document.getElementById('navUser').style.display = 'flex';
            document.getElementById('userInfo').innerText = `خوش آمدید، ${user.username} (${user.role === 'ORGANIZER' ? 'برگزارکننده' : 'شرکت‌کننده'})`;
            localStorage.setItem('user_role', user.role);
        } else {
            logout();
        }
    } catch {
        logout();
    }
}

function logout() {
    localStorage.clear();
    checkUserAuth();
}

document.addEventListener('DOMContentLoaded', checkUserAuth);