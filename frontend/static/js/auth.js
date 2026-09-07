const AUTH_API = '/api/auth/';

function showAuthModal(type = 'login') {
    const modalEl = document.getElementById('authModal');
    if (modalEl) {
        new bootstrap.Modal(modalEl).show();
    }
    switchAuthTab(type);
}

function closeAuthModal() {
    const modalEl = document.getElementById('authModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}

function switchAuthTab(type) {
    const loginSec = document.getElementById('login-form-container') || document.getElementById('loginFormSection');
    const regSec = document.getElementById('register-form-container') || document.getElementById('signupFormSection');
    if (loginSec && regSec) {
        loginSec.classList.toggle('d-none', type !== 'login');
        regSec.classList.toggle('d-none', type !== 'register');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

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
            
            const profileRes = await fetch(`${AUTH_API}profile/`, {
                headers: { 'Authorization': `Bearer ${data.access}` }
            });
            if (profileRes.ok) {
                const userData = await profileRes.json();
                localStorage.setItem('username', userData.username);
                localStorage.setItem('role', userData.role);
            } else {
                localStorage.setItem('username', username);
                localStorage.setItem('role', 'PARTICIPANT');
            }

            alert('با موفقیت وارد شدید! 🎉');
            location.reload();
        } else {
            alert('نام کاربری یا رمز عبور اشتباه است.');
        }
    } catch (err) {
        alert('خطای شبکه رخ داده است.');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername')?.value.trim() || document.getElementById('signupUsername')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim() || document.getElementById('signupEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value || document.getElementById('signupPassword')?.value;
    const role = document.getElementById('regRole')?.value || document.getElementById('signupRole')?.value;

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

async function checkUserAuth() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const res = await fetch(`${AUTH_API}profile/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const user = await res.json();
            localStorage.setItem('username', user.username);
            localStorage.setItem('role', user.role);
        } else {
            logout();
        }
    } catch {
        logout();
    }
}

function logout() {
    localStorage.clear();
    location.reload();
}

document.addEventListener('DOMContentLoaded', checkUserAuth);



// const AUTH_API = '/api/auth/';

// function showAuthModal(type = 'login') {
//     document.getElementById('authModal').style.display = 'flex';
//     switchAuthTab(type);
// }

// function closeAuthModal() {
//     document.getElementById('authModal').style.display = 'none';
// }

// function switchAuthTab(type) {
//     if (type === 'login') {
//         document.getElementById('loginFormSection').style.display = 'block';
//         document.getElementById('signupFormSection').style.display = 'none';
//     } else {
//         document.getElementById('loginFormSection').style.display = 'none';
//         document.getElementById('signupFormSection').style.display = 'block';
//     }
// }

// // ورود به سیستم
// async function handleLogin(e) {
//     e.preventDefault();
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;

//     try {
//         const response = await fetch(`${AUTH_API}login/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });

//         const data = await response.json();
//         if (response.ok) {
//             localStorage.setItem('access_token', data.access);
//             localStorage.setItem('refresh_token', data.refresh);
//             alert('با موفقیت وارد شدید! 🎉');
//             closeAuthModal();
//             checkUserAuth();
//         } else {
//             alert('نام کاربری یا رمز عبور اشتباه است.');
//         }
//     } catch (err) {
//         alert('خطای شبکه رخ داده است.');
//     }
// }

// // ثبت‌نام کاربر با انتخاب نقش
// async function handleSignup(e) {
//     e.preventDefault();
//     const username = document.getElementById('signupUsername').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     const confirmPassword = document.getElementById('signupPasswordConfirm').value;
//     const role = document.getElementById('signupRole').value;

//     if (password !== confirmPassword) {
//         alert('رمز عبور و تکرار آن یکسان نیستند.');
//         return;
//     }

//     try {
//         const response = await fetch(`${AUTH_API}register/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, email, password, role })
//         });

//         if (response.ok) {
//             alert('ثبت‌نام با موفقیت انجام شد. اکنون وارد شوید.');
//             switchAuthTab('login');
//         } else {
//             const data = await response.json();
//             alert(JSON.stringify(data));
//         }
//     } catch (err) {
//         alert('خطا در ثبت‌نام.');
//     }
// }

// // بررسی وضعیت لاگین
// async function checkUserAuth() {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//         document.getElementById('navAuth').style.display = 'block';
//         document.getElementById('navUser').style.display = 'none';
//         return;
//     }

//     try {
//         const res = await fetch(`${AUTH_API}profile/`, {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (res.ok) {
//             const user = await res.json();
//             document.getElementById('navAuth').style.display = 'none';
//             document.getElementById('navUser').style.display = 'flex';
//             document.getElementById('userInfo').innerText = `خوش آمدید، ${user.username} (${user.role === 'ORGANIZER' ? 'برگزارکننده' : 'شرکت‌کننده'})`;
//             localStorage.setItem('user_role', user.role);
//         } else {
//             logout();
//         }
//     } catch {
//         logout();
//     }
// }

// function logout() {
//     localStorage.clear();
//     checkUserAuth();
// }

// document.addEventListener('DOMContentLoaded', checkUserAuth);