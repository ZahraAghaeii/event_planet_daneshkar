function getGlobalEvents() {
    return JSON.parse(localStorage.getItem("global_ep_events")) || [];
}

function saveGlobalEvents(events) {
    localStorage.setItem("global_ep_events", JSON.stringify(events));
}

let currentClassEventId = null;

// لود اولیه تنظیمات تم و اطلاعات سایدبار
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light"; // پیش‌فرض حالت روشن
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeButton(savedTheme);

    loadSidebarUserInfo();
    renderEvents(getGlobalEvents());
});

// تابع سوییچ بین دارک مود و لایت مود
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    if (theme === "dark") {
        btn.innerHTML = `<i class="bi bi-sun"></i> لایت مود`;
    } else {
        btn.innerHTML = `<i class="bi bi-moon-stars"></i> دارک مود`;
    }
}

// مدیریت اطلاعات سایدبار و دکمه‌های هدر
function loadSidebarUserInfo() {
    const sidebarUsername = document.getElementById("sidebarUsername");
    const sidebarUserRole = document.getElementById("sidebarUserRole");
    const sidebarAuthArea = document.getElementById("sidebarAuthArea");
    const roleBadge = document.getElementById("roleBadge");
    const topAuthBtn = document.getElementById("topAuthBtn");
    const organizerPanelBtn = document.getElementById("organizerPanelBtn");
    
    const currentUser = localStorage.getItem("username");
    const currentRole = localStorage.getItem("role");

    if (currentUser && currentRole) {
        if (roleBadge) {
            roleBadge.innerText = `نقش: ${currentRole === 'ORGANIZER' ? 'برگزارکننده' : 'شرکت‌کننده'}`;
            roleBadge.className = `badge ${currentRole === 'ORGANIZER' ? 'bg-warning text-dark' : 'bg-info'} fs-6`;
        }

        sidebarUsername.innerText = currentUser;
        sidebarUserRole.innerText = `نقش: ${currentRole === 'ORGANIZER' ? 'برگزارکننده' : 'شرکت‌کننده'}`;
        sidebarUserRole.className = `badge ${currentRole === 'ORGANIZER' ? 'bg-warning text-dark' : 'bg-info'}`;
        
        // وقتی کاربر لاگین کرده، دکمه بالا نام خود کاربر را نشان می‌دهد و سایدبار را باز می‌کند
        topAuthBtn.innerText = `👤 ${currentUser}`;
        topAuthBtn.className = "btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold";
        topAuthBtn.setAttribute("data-bs-toggle", "offcanvas");
        topAuthBtn.setAttribute("data-bs-target", "#userSidebar");

        if (currentRole === 'ORGANIZER') {
            organizerPanelBtn.classList.remove("d-none");
        }

        sidebarAuthArea.innerHTML = `
            <button class="btn btn-danger w-100 rounded-3 py-2 fw-bold" onclick="logoutUser()">
                <i class="bi bi-box-arrow-right"></i> خروج از حساب
            </button>
        `;
    } else {
        if (roleBadge) {
            roleBadge.innerText = "نقش: میهمان";
            roleBadge.className = "badge bg-secondary fs-6";
        }
        sidebarUsername.innerText = "مهمان عزیز";
        sidebarUserRole.innerText = "نقش: بازدیدکننده";
        
        // وقتی کاربر لاگین نکرده، دکمه بالا مودال ورود/ثبت‌نام را باز می‌کند
        topAuthBtn.innerText = "ورود / ثبت‌نام";
        topAuthBtn.className = "btn btn-primary btn-sm rounded-pill px-4";
        topAuthBtn.setAttribute("data-bs-toggle", "modal");
        topAuthBtn.setAttribute("data-bs-target", "#authModal");

        organizerPanelBtn.classList.add("d-none");

        sidebarAuthArea.innerHTML = `
            <button class="btn btn-primary w-100 rounded-3 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#authModal" data-bs-dismiss="offcanvas">
                <i class="bi bi-box-arrow-in-left"></i> ورود یا ثبت‌نام
            </button>
        `;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const savedRole = localStorage.getItem(`user_role_${username}`);
    const savedPass = localStorage.getItem(`user_pass_${username}`);

    if (!savedRole) {
        alert("این نام کاربری یافت نشد! لطفاً ابتدا حساب بسازید.");
        return;
    }

    if (savedPass && savedPass !== password) {
        alert("کلمه عبور اشتباه است!");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("role", savedRole);
    alert(`خوش آمدید ${username} عزیز! 🎉`);
    location.reload();
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem(`user_role_${username}`, role);
    localStorage.setItem(`user_pass_${username}`, password); // ذخیره امن رمز عبور

    alert(`حساب کاربری ${username} ساخته شد! 🎉`);
    location.reload();
}

function logoutUser() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    sessionStorage.clear();
    location.reload();
}

// تابع جابجایی بین حالت ورود و ثبت‌نام در مودال
function switchAuthMode(type) {
    const loginContainer = document.getElementById("login-form-container");
    const registerContainer = document.getElementById("register-form-container");
    const modalTitle = document.getElementById("authModalTitle");

    if (type === 'login') {
        loginContainer.classList.remove("d-none");
        registerContainer.classList.add("d-none");
        if (modalTitle) modalTitle.innerText = "ورود به حساب کاربری";
    } else {
        loginContainer.classList.add("d-none");
        registerContainer.classList.remove("d-none");
        if (modalTitle) modalTitle.innerText = "ثبت‌نام در پلتفرم";
    }
}

function handleCategoryClick(category) {
    const currentUser = localStorage.getItem("username");
    const currentRole = localStorage.getItem("role");

    if (!currentUser) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        new bootstrap.Modal(document.getElementById('authModal')).show();
        return;
    }

    if (currentRole === 'ORGANIZER') {
        openCreateModal(category);
    } else {
        filterByCategory(category);
    }
}

function openCreateModal(category) {
    document.getElementById("eventCategoryInput").value = category;
    document.getElementById("catDynamicLabel").innerText = getCategoryTitle(category);
    const container = document.getElementById("dynamicFieldsContainer");
    container.innerHTML = "";

    if (category === 'TOURNAMENT') {
        container.innerHTML = `
            <div class="col-md-6"><label class="form-label small fw-bold">تعداد راندها</label><input type="number" id="attr_rounds" class="form-control" value="3"></div>
            <div class="col-md-6"><label class="form-label small fw-bold">نوع حذف</label><select id="attr_elimination" class="form-select"><option value="حذفی مستقیم">حذفی مستقیم</option><option value="دوره‌ای">دوره‌ای</option></select></div>
        `;
    } else if (category === 'WEBINAR') {
        container.innerHTML = `
            <div class="col-md-6"><label class="form-label small fw-bold">پلتفرم</label><select id="attr_platform" class="form-select"><option value="Google Meet">Google Meet</option><option value="Zoom">Zoom</option></select></div>
            <div class="col-md-6"><label class="form-label small fw-bold">ضبط کامل؟</label><select id="attr_recording" class="form-select"><option value="بله">بله</option><option value="خیر">خیر</option></select></div>
        `;
    } else if (category === 'WORKSHOP') {
        container.innerHTML = `
            <div class="col-md-6"><label class="form-label small fw-bold">سطح سختی</label><select id="attr_difficulty" class="form-select"><option value="مبتدی">مبتدی</option><option value="پیشرفته">پیشرفته</option></select></div>
            <div class="col-md-6"><label class="form-label small fw-bold">پیش‌نیازها</label><input type="text" id="attr_prereq" class="form-control"></div>
        `;
    } else if (category === 'SPORTS') {
        container.innerHTML = `
            <div class="col-md-4"><label class="form-label small fw-bold">رشته ورزشی</label><select id="attr_sport" class="form-select"><option value="فوتبال">فوتبال</option><option value="والیبال">والیبال</option></select></div>
            <div class="col-md-4"><label class="form-label small fw-bold">نوع زمین</label><select id="attr_venue" class="form-select"><option value="سرپوشیده">سرپوشیده</option><option value="روباز">روباز</option></select></div>
            <div class="col-md-4"><label class="form-label small fw-bold">جنسیت</label><select id="attr_gender" class="form-select"><option value="آقایان">آقایان</option><option value="بانوان">بانوان</option></select></div>
        `;
    }

    new bootstrap.Modal(document.getElementById('createEventModal')).show();
}

function submitCreateEvent(e) {
    e.preventDefault();
    const currentUser = localStorage.getItem("username") || "organizer";
    const imageFileInput = document.getElementById("evtImageFile");
    const defaultImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop";

    const allEvents = getGlobalEvents();

    const newEvt = {
        id: Date.now(),
        title: document.getElementById("evtTitle").value,
        description: document.getElementById("evtDescription").value,
        capacity: parseInt(document.getElementById("evtCapacity").value),
        start_date: document.getElementById("evtStartDate").value,
        end_date: document.getElementById("evtEndDate").value,
        registered_count: 0,
        participants: [],
        stages: [],
        feedbacks: [],
        category: document.getElementById("eventCategoryInput").value,
        image: defaultImg,
        status: "DRAFT",
        organizer: currentUser
    };

    const saveAndRender = (evtObj) => {
        allEvents.unshift(evtObj);
        saveGlobalEvents(allEvents);
        renderEvents(allEvents);
        
        bootstrap.Modal.getInstance(document.getElementById('createEventModal')).hide();
        document.getElementById("createEventForm").reset();

        alert(`رویداد "${evtObj.title}" ایجاد شد! اکنون می‌توانید آن را انتشار (Publish) دهید.`);
    };

    if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (evt) {
            newEvt.image = evt.target.result;
            saveAndRender(newEvt);
        };
        reader.readAsDataURL(imageFileInput.files[0]);
    } else {
        saveAndRender(newEvt);
    }
}

function renderEvents(events) {
    const container = document.getElementById("eventsList");
    container.innerHTML = "";

    const currentRole = localStorage.getItem("role") || "GUEST";
    const currentUser = localStorage.getItem("username");

    const visibleEvents = events.filter(evt => {
        if (evt.status === 'DRAFT') {
            return currentRole === 'ORGANIZER' && evt.organizer === currentUser;
        }
        return true;
    });

    if (!visibleEvents || visibleEvents.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted py-5 fs-5">هیچ رویدادی موجود نیست.</div>`;
        return;
    }

    visibleEvents.forEach(event => {
        const remainingCap = event.capacity - (event.registered_count || 0);
        const isOrganizer = currentRole === 'ORGANIZER' && event.organizer === currentUser;
        const isRegistered = event.participants && event.participants.some(p => p.username === currentUser);

        const startDateStr = event.start_date ? new Date(event.start_date).toLocaleString('fa-IR', { dateStyle: 'short', timeStyle: 'short' }) : 'تعیین نشده';
        const endDateStr = event.end_date ? new Date(event.end_date).toLocaleString('fa-IR', { dateStyle: 'short', timeStyle: 'short' }) : 'تعیین نشده';

        let actionHTML = '';

        if (isOrganizer) {
            actionHTML = `
                <button class="btn btn-info btn-sm w-100 fw-bold mb-2 text-white" onclick="openClassManagement(${event.id})">🎓 مدیریت رویداد و جلسات</button>
            `;
            if (event.status === 'DRAFT') {
                actionHTML += `<button class="btn btn-warning btn-sm w-100 fw-bold" onclick="changeStatus(${event.id}, 'PUBLISHED')">🚀 انتشار رویداد (Publish)</button>`;
            } else if (event.status === 'PUBLISHED') {
                actionHTML += `<button class="btn btn-danger btn-sm w-100 fw-bold" onclick="changeStatus(${event.id}, 'CLOSED')">🔒 بستن ثبت‌نام (Close)</button>`;
            } else if (event.status === 'CLOSED') {
                actionHTML += `<button class="btn btn-secondary btn-sm w-100 fw-bold" onclick="changeStatus(${event.id}, 'FINISHED')">🏁 اتمام رویداد (Finish)</button>`;
            } else {
                actionHTML += `<span class="badge bg-secondary w-100 py-2">رویداد به پایان رسید</span>`;
            }
        } else {
            let btnClassInfo = `<button class="btn btn-outline-info btn-sm w-100 mb-2" onclick="openClassManagement(${event.id})">📊 مشاهده جلسات / جدول رده‌بندی</button>`;
            
            if (event.status !== 'PUBLISHED') {
                actionHTML = btnClassInfo + `<button class="btn btn-outline-secondary btn-sm w-100" disabled>غیرقابل ثبت‌نام (${event.status})</button>`;
            } else if (isRegistered) {
                actionHTML = btnClassInfo + `<button class="btn btn-success btn-sm w-100" disabled>✓ ثبت‌نام شده‌اید</button>`;
            } else if (remainingCap <= 0) {
                actionHTML = btnClassInfo + `<button class="btn btn-secondary btn-sm w-100" disabled>ظرفیت تکمیلی</button>`;
            } else {
                actionHTML = btnClassInfo + `<button class="btn btn-primary btn-sm w-100" onclick="registerEvent(${event.id})">ثبت‌نام و رزرو</button>`;
            }
        }

        const cardHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="event-card">
                    <img src="${event.image}" class="event-banner" alt="${event.title}">
                    <div class="event-card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill small">${getCategoryTitle(event.category)}</span>
                            <span class="badge bg-secondary">${event.status}</span>
                        </div>
                        <h5 class="fw-bold mb-2">${event.title}</h5>
                        <p class="text-muted small flex-grow-1 mb-3">${event.description}</p>
                        
                        <div class="p-2 rounded-3 mb-3 border bg-secondary bg-opacity-10 extra-small">
                            <div><i class="bi bi-calendar-event text-info me-1"></i> <strong>شروع:</strong> ${startDateStr}</div>
                            <div><i class="bi bi-calendar-check text-warning me-1"></i> <strong>پایان:</strong> ${endDateStr}</div>
                        </div>

                        <div class="pt-2 border-top mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted">ظرفیت باقی‌مانده:</small>
                                <strong class="text-${remainingCap > 0 ? 'success' : 'danger'}">${remainingCap} نفر از ${event.capacity}</strong>
                            </div>
                            ${actionHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function registerEvent(id) {
    const currentUser = localStorage.getItem("username");
    if (!currentUser) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        new bootstrap.Modal(document.getElementById('authModal')).show();
        return;
    }

    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === id);

    if (evt && evt.capacity > evt.registered_count) {
        if (!evt.participants) evt.participants = [];
        
        if (evt.participants.some(p => p.username === currentUser)) {
            alert("شما قبلاً در این رویداد ثبت‌نام کرده‌اید!");
            return;
        }

        evt.registered_count += 1;
        evt.participants.push({ username: currentUser, score: 0 });
        
        saveGlobalEvents(allEvents);
        renderEvents(allEvents);
        alert(`ثبت‌نام شما در رویداد "${evt.title}" با موفقیت انجام شد! 🎉`);
    }
}

function openClassManagement(eventId) {
    currentClassEventId = eventId;
    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === eventId);
    if (!evt) return;

    document.getElementById("modalClassName").innerText = evt.title;
    
    renderParticipantsList(evt);
    renderStagesList(evt);
    renderLeaderboard(evt);
    renderFeedbacks(evt);

    switchClassTab('participants');
    new bootstrap.Modal(document.getElementById('classManagementModal')).show();
}

function switchClassTab(tabName) {
    document.getElementById("class-participants-section").classList.toggle("d-none", tabName !== 'participants');
    document.getElementById("class-stages-section").classList.toggle("d-none", tabName !== 'stages');
    document.getElementById("class-leaderboard-section").classList.toggle("d-none", tabName !== 'leaderboard');
    document.getElementById("class-feedbacks-section").classList.toggle("d-none", tabName !== 'feedbacks');

    document.getElementById("tab-participants-btn").className = tabName === 'participants' ? "nav-link active fw-bold" : "nav-link fw-bold";
    document.getElementById("tab-stages-btn").className = tabName === 'stages' ? "nav-link active fw-bold" : "nav-link fw-bold";
    document.getElementById("tab-leaderboard-btn").className = tabName === 'leaderboard' ? "nav-link active fw-bold" : "nav-link fw-bold";
    document.getElementById("tab-feedback-btn").className = tabName === 'feedbacks' ? "nav-link active fw-bold" : "nav-link fw-bold";
}

function renderStagesList(evt) {
    const container = document.getElementById("stagesListContainer");
    const addBox = document.getElementById("addStageContainer");
    container.innerHTML = "";

    const currentRole = localStorage.getItem("role");
    const currentUser = localStorage.getItem("username");
    const isOrganizer = currentRole === 'ORGANIZER' && evt.organizer === currentUser;

    if (isOrganizer) {
        addBox.classList.remove("d-none");
    } else {
        addBox.classList.add("d-none");
    }

    if (!evt.stages || evt.stages.length === 0) {
        container.innerHTML = `<div class="text-muted small">هنوز هیچ مرحله یا جلسه‌ای برای این رویداد تعریف نشده است.</div>`;
        return;
    }

    const sortedStages = [...evt.stages].sort((a, b) => a.order - b.order);

    sortedStages.forEach(stg => {
        container.innerHTML += `
            <div class="p-3 rounded-3 border d-flex justify-content-between align-items-center bg-secondary bg-opacity-10">
                <div>
                    <span class="badge bg-warning text-dark me-2">راند/جلسه ${stg.order}</span>
                    <strong class="fw-bold">${stg.title}</strong>
                    <div class="text-muted small mt-1"><i class="bi bi-person-video3 text-info me-1"></i> <strong>سخنران/مدرس/داور:</strong> ${stg.speaker || 'تعیین نشده'}</div>
                </div>
                <span class="badge bg-success">فعال</span>
            </div>
        `;
    });
}

function submitAddStage() {
    const title = document.getElementById("stageTitleInput").value.trim();
    const speaker = document.getElementById("stageSpeakerInput").value.trim();
    const order = parseInt(document.getElementById("stageOrderInput").value) || 1;

    if (!title) {
        alert("لطفاً عنوان جلسه/مرحله را وارد کنید.");
        return;
    }

    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === currentClassEventId);

    if (evt) {
        if (!evt.stages) evt.stages = [];
        evt.stages.push({ id: Date.now(), title, speaker, order });

        saveGlobalEvents(allEvents);
        renderStagesList(evt);

        document.getElementById("stageTitleInput").value = "";
        document.getElementById("stageSpeakerInput").value = "";
        document.getElementById("stageOrderInput").value = "";
        alert("جلسه/مرحله جدید با موفقیت اضافه شد! 🚀");
    }
}

function renderParticipantsList(evt) {
    const tbody = document.getElementById("participantsTableBody");
    tbody.innerHTML = "";

    const currentRole = localStorage.getItem("role");
    const currentUser = localStorage.getItem("username");
    const isOrganizer = currentRole === 'ORGANIZER' && evt.organizer === currentUser;

    if (!evt.participants || evt.participants.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">هنوز هیچ‌کس در این کلاس ثبت‌نام نکرده است.</td></tr>`;
        return;
    }

    evt.participants.forEach((p, idx) => {
        let gradingCol = isOrganizer ? `
            <div class="input-group input-group-sm" style="max-width: 180px;">
                <input type="number" id="score_input_${p.username}" class="form-control" value="${p.score || 0}">
                <button class="btn btn-success btn-sm" onclick="saveParticipantScore('${p.username}')">ثبت نمره</button>
            </div>
        ` : `<span class="text-muted small">غیرقابل تغییر</span>`;

        tbody.innerHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td class="fw-bold text-primary">${p.username}</td>
                <td><span class="badge bg-success">تایید شده</span></td>
                <td class="fw-bold text-warning fs-5">${p.score || 0}</td>
                <td>${gradingCol}</td>
            </tr>
        `;
    });
}

function saveParticipantScore(participantUsername) {
    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === currentClassEventId);
    if (!evt) return;

    const inputVal = parseInt(document.getElementById(`score_input_${participantUsername}`).value);
    const participant = evt.participants.find(p => p.username === participantUsername);
    
    if (participant) {
        participant.score = inputVal;
        saveGlobalEvents(allEvents);
        renderParticipantsList(evt);
        renderLeaderboard(evt);
        alert(`نمره ${participantUsername} با موفقیت ثبت شد!`);
    }
}

function renderLeaderboard(evt) {
    const tbody = document.getElementById("leaderboardTableBody");
    tbody.innerHTML = "";

    if (!evt.participants || evt.participants.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">شرکت‌کننده‌ای وجود ندارد.</td></tr>`;
        return;
    }

    const sorted = [...evt.participants].sort((a, b) => (b.score || 0) - (a.score || 0));

    sorted.forEach((p, idx) => {
        let badgeIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
        tbody.innerHTML += `
            <tr>
                <td class="fs-5">${badgeIcon}</td>
                <td class="fw-bold">${p.username}</td>
                <td class="fw-bold text-warning fs-5">${p.score || 0}</td>
                <td><span class="badge bg-primary">شرکت‌کننده</span></td>
            </tr>
        `;
    });
}

function renderFeedbacks(evt) {
    const container = document.getElementById("feedbacksListContainer");
    const addBox = document.getElementById("addFeedbackContainer");
    container.innerHTML = "";

    const currentUser = localStorage.getItem("username");
    const isRegistered = evt.participants && evt.participants.some(p => p.username === currentUser);
    
    if (isRegistered && evt.status === 'FINISHED') {
        addBox.classList.remove("d-none");
    } else {
        addBox.classList.add("d-none");
    }

    if (!evt.feedbacks || evt.feedbacks.length === 0) {
        container.innerHTML = `<div class="text-muted small">هنوز نظری ثبت نشده است.</div>`;
        return;
    }

    evt.feedbacks.forEach(f => {
        container.innerHTML += `
            <div class="p-3 rounded-3 mb-2 border bg-secondary bg-opacity-10">
                <div class="d-flex justify-content-between">
                    <strong class="text-primary">${f.username}</strong>
                    <small class="text-muted">بازخورد دوره</small>
                </div>
                <p class="mb-0 mt-1 small">${f.text}</p>
            </div>
        `;
    });
}

function submitFeedback() {
    const currentUser = localStorage.getItem("username");
    const text = document.getElementById("feedbackComment").value.trim();
    if (!text) return;

    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === currentClassEventId);
    
    if (evt) {
        if (!evt.feedbacks) evt.feedbacks = [];
        evt.feedbacks.push({ username: currentUser, text: text });
        
        saveGlobalEvents(allEvents);
        renderFeedbacks(evt);
        document.getElementById("feedbackComment").value = "";
        alert("نظر شما با موفقیت ثبت شد!");
    }
}

function changeStatus(id, newStatus) {
    const allEvents = getGlobalEvents();
    const evt = allEvents.find(e => e.id === id);
    if (evt) {
        evt.status = newStatus;
        saveGlobalEvents(allEvents);
        renderEvents(allEvents);
        alert(`وضعیت رویداد به ${newStatus} تغییر یافت.`);
    }
}

function getCategoryTitle(cat) {
    const map = { 'TOURNAMENT': 'تورنمنت', 'WEBINAR': 'وبینار', 'WORKSHOP': 'ورکشاپ', 'SPORTS': 'ورزشی' };
    return map[cat] || cat;
}

function filterByCategory(cat) {
    renderEvents(getGlobalEvents().filter(e => e.category === cat));
}

function resetFilters() {
    renderEvents(getGlobalEvents());
    
    const sectionTitle = document.getElementById("sectionTitle");
    if (sectionTitle) {
        sectionTitle.innerHTML = `رویدادهای منتشرشده`;
    }

    const sidebarElement = document.getElementById("userSidebar");
    if (sidebarElement) {
        const sidebarInstance = bootstrap.Offcanvas.getInstance(sidebarElement);
        if (sidebarInstance) {
            sidebarInstance.hide();
        }
    }
}

function handleSearch() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    renderEvents(getGlobalEvents().filter(e => e.title.toLowerCase().includes(q)));
}

function filterMyEvents() {
    const currentUser = localStorage.getItem("username");
    const allEvents = getGlobalEvents();
    const myEvents = allEvents.filter(e => e.organizer === currentUser);
    renderEvents(myEvents);
    document.getElementById("sectionTitle").innerHTML = `<i class="bi bi-calendar-plus text-warning"></i> رویدادهای ایجاد شده توسط من`;
}


function filterMyRegistrations() {
    const currentUser = localStorage.getItem("username");
    if (!currentUser) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        return;
    }
    const allEvents = getGlobalEvents();
    const registeredEvents = allEvents.filter(e => e.participants && e.participants.some(p => p.username === currentUser));
    renderEvents(registeredEvents);
    
    const sectionTitle = document.getElementById("sectionTitle");
    if (sectionTitle) {
        sectionTitle.innerHTML = `<i class="bi bi-journal-check text-success"></i> رویدادهای ثبت‌نام‌شده من`;
    }
}