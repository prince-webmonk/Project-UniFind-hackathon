// PrimeNeuron/scripts/login.js
// Login logic and session

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const pwdInput = document.getElementById("login-password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const pwd = pwdInput.value;

    if (!email.endsWith("@paruluniversity.ac.in")) {
      showToast("Use your official @paruluniversity.ac.in email.", "error");
      return;
    }

    const { ok, user, message } = loginUser(email, pwd);
    if (!ok) {
      showToast(message, "error");
      return;
    }

    showToast("Login successful. Redirecting to dashboard…", "success");

    setTimeout(() => {
      window.location.href = "../pages/dashboard.html";
    }, 600);
  });
});
