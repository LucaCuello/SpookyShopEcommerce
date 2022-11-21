const form = document.getElementById("form"),
  usernameInput = document.getElementById("username"),
  emailInput = document.getElementById("email"),
  passwordInput = document.getElementById("password"),
  confirmPasswordInput = document.getElementById("confirm-password");

const usernameSpan = document.getElementById("username-msg"),
  emailSpan = document.getElementById("email-msg"),
  passwordSpan = document.getElementById("password-msg"),
  confirmPasswordSpan = document.getElementById("confirm-password-msg");

const localStorageUserData = JSON.parse(localStorage.getItem("User")) || [];

const labelIcon = (input, valid = false) => {
  let label = input.parentElement;
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  if (label.childElementCount > 1) {
    label.removeChild(label.lastChild);
  }
  if (valid) {
    icon.classList.remove("fa-circle-xmark");
    icon.classList.add("fa-circle-check");
  } else {
    icon.classList.remove("fa-circle-check");
    icon.classList.add("fa-circle-xmark");
  }
  label.appendChild(icon);
};

const formMsgs = (msg, HTMLspan, valid = false) => {
  if (valid) {
    HTMLspan.style.opacity = "1";
    HTMLspan.innerHTML = `<i class="fa-solid fa-circle-check msg-icon"></i> ${msg}`;
  } else {
    HTMLspan.style.opacity = "1";
    HTMLspan.innerHTML = `<i class="fa-solid fa-circle-xmark msg-icon"></i> ${msg}`;
  }
};

const toggleClases = (valid = false, input) => {
  if (valid) {
    return input.classList.remove("not-valid"), input.classList.add("success");
  } else {
    return input.classList.remove("success"), input.classList.add("not-valid");
  }
};

const clearIconsClearClasses = () => {
  let usernameLabel = usernameInput.parentElement,
    emailLabel = emailInput.parentElement,
    passwordLabel = passwordInput.parentElement,
    confirmPasswordLabel = confirmPasswordInput.parentElement;

  usernameLabel.removeChild(usernameLabel.lastChild),
    emailLabel.removeChild(emailLabel.lastChild),
    passwordLabel.removeChild(passwordLabel.lastChild),
    confirmPasswordLabel.removeChild(confirmPasswordLabel.lastChild),
    usernameInput.classList.remove("success"),
    emailInput.classList.remove("success"),
    passwordInput.classList.remove("success"),
    confirmPasswordInput.classList.remove("success"),
    (usernameSpan.style.display = "none"),
    (emailSpan.style.display = "none"),
    (passwordSpan.style.display = "none"),
    (confirmPasswordSpan.style.display = "none");
};

const accountCreatedMessage = () => {
  let container = document.querySelector(".register-container"),
    msg = document.createElement("div"),
    registerSection = document.querySelector(".register-section"),
    ghostSection = document.querySelector(".ghost-section");

  msg.classList.add("account-created");

  msg.innerHTML = `
  <h3>
  Account created!
  <i class="fa-solid fa-circle-check"></i>
  </h3>
  <p>Your account is ready. Redirecting to login page...</p>
  `;

  container.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "1";
  }, 100);

  (registerSection.style.filter = "blur(10px)"),
    (ghostSection.style.filter = "blur(10px)");

  setTimeout(() => {
    document.location.href = "login.html";
  }, 3000);
};

const isUsernameValid = () => {
  valid = false;
  let value = usernameInput.value.trim();
  let userNameRegex = /^[a-zA-Z0-9.\-_$@*!]{5,30}$/;

  if (userNameRegex.test(value)) {
    (valid = true),
      formMsgs("Perfect username!", usernameSpan, true),
      labelIcon(usernameInput, true),
      toggleClases(true, usernameInput);
  } else if (!value) {
    formMsgs("Username input can't be empty", usernameSpan, false),
      labelIcon(usernameInput, false),
      toggleClases(false, usernameInput);
  } else {
    formMsgs(
      "Hmm, try another username! (More than 5 characters)",
      usernameSpan
    ),
      labelIcon(usernameInput, (valid = false)),
      toggleClases((valid = false), usernameInput);
  }

  return valid;
};

const isEmailValid = () => {
  valid = false;
  let value = emailInput.value.trim();
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(value)) {
    (valid = true),
      formMsgs("Wow, nice email!", emailSpan, true),
      labelIcon(emailInput, true),
      toggleClases(true, emailInput);
  } else if (!value) {
    formMsgs("Email input can't be empty", emailSpan, false),
      labelIcon(emailInput, false),
      toggleClases(false, emailInput);
  } else {
    formMsgs("Something's wrong with that email...", emailSpan),
      labelIcon(emailInput),
      toggleClases(false, emailInput);
  }

  return valid;
};

const isPasswordValid = () => {
  valid = false;
  let value = passwordInput.value.trim();
  let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (passwordRegex.test(value)) {
    (valid = true),
      formMsgs("That's a very strong password.", passwordSpan, true),
      labelIcon(passwordInput, true),
      toggleClases(true, passwordInput);
  } else if (!value) {
    formMsgs("Password input can't be empty", passwordSpan, false),
      labelIcon(passwordInput, false),
      toggleClases(false, passwordInput),
      labelIcon(confirmPasswordInput, false),
      toggleClases(false, confirmPasswordInput);
  } else {
    formMsgs(
      "Weak password, sorry (At least one number and one special character)",
      passwordSpan
    ),
      labelIcon(passwordInput),
      toggleClases(false, passwordInput);
  }

  const timer = setInterval(() => {
    if (confirmPassword(value)) {
      clearInterval(timer);
    } else confirmPassword(value);
  }, 200);

  return valid;
};

const confirmPassword = (password) => {
  valid = false;
  let value = confirmPasswordInput.value.trim();
  if (value && password === value) {
    (valid = true),
      formMsgs(
        "Yep, I can confirm those passwords are identical.",
        confirmPasswordSpan,
        true
      ),
      labelIcon(confirmPasswordInput, true),
      toggleClases(true, confirmPasswordInput);
  } else if (value && password !== value) {
    formMsgs("Password do not match :(", confirmPasswordSpan),
      labelIcon(confirmPasswordInput),
      toggleClases(false, confirmPasswordInput);
  } else {
    return;
  }

  return valid;
};

const saveToLocalStorage = (username, email, password) => {
  let userData = [
    ...localStorageUserData,
    {
      user: username,
      email: email,
      password: password,
      logged: null,
    },
  ];

  localStorage.setItem("User", JSON.stringify(userData));
};

const init = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isUsernameValid(), isEmailValid(), isPasswordValid();
    if (isUsernameValid() && isEmailValid() && isPasswordValid()) {
      saveToLocalStorage(
        usernameInput.value,
        emailInput.value,
        passwordInput.value
      ),
        clearIconsClearClasses(),
        form.reset(),
        accountCreatedMessage();
    } else {
      return;
    }
  });
  form.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "username":
        usernameInput.addEventListener("focusout", isUsernameValid);
        break;
      case "email":
        emailInput.addEventListener("focusout", isEmailValid);
        break;
      case "password":
        passwordInput.addEventListener("focusout", isPasswordValid);
        break;
    }
  });
};

init();
