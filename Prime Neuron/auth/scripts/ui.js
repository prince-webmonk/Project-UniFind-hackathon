// PrimeNeuron/scripts/ui.js
// Shared UI helpers (toast, theme, nav, session guard)

// PrimeNeuron/scripts/ui.js
// Shared UI helpers (toast, theme, nav, session guard)

/* THEME -------------------------------------------------- */

function initTheme() {
  const settings = getSettings();
  const theme = settings.theme || "dark";
  document.documentElement.setAttribute("data-theme", theme);

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      saveSettings({ ...settings, theme: next });
    });
  }
}

/* SESSION GUARD ------------------------------------------ */

function ensureSessionOrRedirect() {
  const user = getCurrentUser();
  if (!user) {
    window.location.replace("../auth/login.html");
  }
  return user;
}

/* NAVBAR ------------------------------------------------- */

function initNavbar(user) {
  const avatarImg = document.getElementById("nav-avatar-img");
  if (avatarImg && user?.profilePhoto) {
    avatarImg.src = user.profilePhoto;
  }

  const dropdown = document.getElementById("nav-profile-dropdown");
  const avatarBtn = document.getElementById("nav-avatar-btn");
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  const logoutBtns = document.querySelectorAll("[data-logout]");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      logoutUser();
      window.location.replace("../auth/login.html");
    });
  });

  const profileNameEl = document.getElementById("nav-profile-name");
  const profileMetaEl = document.getElementById("nav-profile-meta");
  if (profileNameEl && user) {
    profileNameEl.textContent = user.name || "Student";
  }
  if (profileMetaEl && user) {
    profileMetaEl.textContent = user.email;
  }

  const viewProfileBtn = document.getElementById("nav-view-profile");
  if (viewProfileBtn) {
    viewProfileBtn.addEventListener("click", () => {
      window.location.href = "../pages/profile.html";
    });
  }
}

/* TOASTS ------------------------------------------------- */

function showToast(message, variant = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  const badge = document.createElement("span");
  badge.className = "badge badge-soft";
  badge.textContent =
    variant === "success"
      ? "Success"
      : variant === "error"
      ? "Error"
      : "Notice";

  const text = document.createElement("span");
  text.textContent = message;

  const close = document.createElement("span");
  close.className = "toast-close";
  close.textContent = "✕";

  toast.appendChild(badge);
  toast.appendChild(text);
  toast.appendChild(close);

  container.appendChild(toast);

  close.addEventListener("click", () => toast.remove());
  setTimeout(() => toast.remove(), 4500);
}

/* Simple nav highlighting -------------------------------- */

function markSidebarActive(slug) {
  document
    .querySelectorAll(".sidebar-link")
    .forEach((link) =>
      link.dataset.page === slug
        ? link.classList.add("active")
        : link.classList.remove("active")
    );
}

/* MOBILE SIDEBAR (DRAWER) -------------------------------- */

function initMobileSidebar() {
  const sidebar = document.querySelector(".app-sidebar");
  const toggle = document.getElementById("nav-sidebar-toggle");
  if (!sidebar || !toggle) return;

  const mq = window.matchMedia("(max-width: 900px)");

  function closeSidebar() {
    if (!mq.matches) return;
    sidebar.classList.remove("is-open");
  }

  // open / close when clicking the ☰ button
  toggle.addEventListener("click", () => {
    if (!mq.matches) return;
    sidebar.classList.toggle("is-open");
  });

  // auto-close when user picks any Control Center option
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });
}

// expose for other scripts (dashboard.js, etc.)
window.initMobileSidebar = initMobileSidebar;
