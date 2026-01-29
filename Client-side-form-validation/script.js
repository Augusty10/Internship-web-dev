document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  function showError(input, message) {
    const error = input.nextElementSibling;
    input.classList.add("error");
    input.classList.remove("success");
    error.textContent = message;
    error.classList.add("visible");
  }

  function showSuccess(input) {
    const error = input.nextElementSibling;
    input.classList.remove("error");
    input.classList.add("success");
    error.classList.remove("visible");
  }

  function validateName() {
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required");
      return false;
    }
    showSuccess(nameInput);
    return true;
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Invalid email format");
      return false;
    }
    showSuccess(emailInput);
    return true;
  }

  function validatePassword() {
    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters");
      return false;
    }
    showSuccess(passwordInput);
    return true;
  }

  function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, "Passwords do not match");
      return false;
    }
    showSuccess(confirmPasswordInput);
    return true;
  }

  nameInput.addEventListener("keyup", validateName);
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("keyup", validatePassword);
  confirmPasswordInput.addEventListener("keyup", validateConfirmPassword);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword();

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
      document.querySelectorAll("input").forEach(input => {
        input.classList.remove("success");
      });
    }
  });

});
