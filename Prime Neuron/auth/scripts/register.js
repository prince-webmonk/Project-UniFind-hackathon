// PrimeNeuron/scripts/register.js
// Registration logic with profile photo preview

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const form = document.getElementById("register-form");
  const photoInput = document.getElementById("reg-photo");
  const photoPreview = document.getElementById("reg-photo-preview");
  let photoDataUrl = "";

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    photoPreview.innerHTML = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      photoDataUrl = reader.result;
      const img = document.createElement("img");
      img.src = photoDataUrl;
      img.style.width = "52px";
      img.style.height = "52px";
      img.style.borderRadius = "999px";
      img.style.objectFit = "cover";
      img.style.border = "1px solid rgba(148,163,184,0.7)";

      const text = document.createElement("span");
      text.className = "text-muted";
      text.textContent = "Preview linked to your UniFind profile.";

      photoPreview.appendChild(img);
      photoPreview.appendChild(text);
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("reg-name").value.trim(),
      phone: document.getElementById("reg-phone").value.trim(),
      university: document.getElementById("reg-university").value.trim(),
      enrollment: document.getElementById("reg-enrollment").value.trim(),
      age: parseInt(document.getElementById("reg-age").value, 10),
      username: document.getElementById("reg-username").value.trim(),
      email: document.getElementById("reg-email").value.trim(),
      password: document.getElementById("reg-password").value,
      profilePhoto: photoDataUrl
    };

    const { ok, message, user } = registerUser(payload);
    if (!ok) {
      showToast(message, "error");
      return;
    }

    showToast("Account created. Redirecting to login…", "success");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 700);
  });
});
