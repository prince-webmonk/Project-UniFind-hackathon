// PrimeNeuron/scripts/forgot.js
// UI-only forgot password

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const form = document.getElementById("forgot-form");
  const emailInput = document.getElementById("forgot-email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email.endsWith("@paruluniversity.ac.in")) {
      showToast("Please use your @paruluniversity.ac.in email.", "error");
      return;
    }
    showToast(
      "If this email exists, a secure reset link will be sent by UniFind backend.",
      "success"
    );
  });
});
