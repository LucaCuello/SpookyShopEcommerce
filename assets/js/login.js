const form = document.getElementById("form-login"),
  usernameInput = document.getElementById("username-login"),
  passwordInput = document.getElementById("password-login");

const passwordLoginSpan = document.getElementById("password-msg"),
  userSpan = document.getElementById("invalid-user-msg");

const localStorageUserData = JSON.parse(localStorage.getItem("User")) || [];

const formLoginMsgs = (msg, HTMLspan, valid = false) => {
  if (valid) {
    HTMLspan.style.opacity = "1";
    HTMLspan.innerHTML = `<i class="fa-solid fa-circle-check msg-icon"></i> ${msg}`;
  } else {
    HTMLspan.style.opacity = "1";
    HTMLspan.innerHTML = `<i class="fa-solid fa-circle-xmark msg-icon"></i> ${msg}`;
  }
};

const isLoginPasswordValid = () => {
  valid = false;
  let passwordValue = passwordInput.value.trim();
  let userData =
    localStorageUserData.find((e) => e.password === passwordValue) || [];

  if (passwordValue === userData.password) {
    valid = true;
  } else if (!passwordValue) {
    formLoginMsgs("Password input can't be empty", passwordLoginSpan, false);
  } else if (passwordValue !== userData.password) {
    formLoginMsgs("Invalid password", passwordLoginSpan, false);
  } else {
    valid;
  }
  return valid;
};

const isUserValid = () => {
  valid = false;
  let usernameValue = usernameInput.value.trim();
  let userData =
    localStorageUserData.find((e) => e.user === usernameValue) || [];

  if (usernameValue === userData.user || usernameValue === userData.email) {
    valid = true;
  } else if (!usernameValue) {
    formLoginMsgs("Username can't be empty", userSpan, false);
  } else {
    valid;
  }
  return valid;
};

const updateLocalStorageLoginState = (username) => {
  let userData = localStorageUserData.find((e) => e.user === username);
  userData.logged = true;
  localStorage.setItem("User", JSON.stringify(localStorageUserData));
};

const accountLogged = () => {
  let container = document.querySelector(".register-container"),
    msg = document.createElement("div"),
    registerSection = document.querySelector(".register-section"),
    ghostSection = document.querySelector(".ghost-section");

  msg.classList.add("account-logged");
  msg.innerHTML = `
  <h3>
  Account logged!
  <i class="fa-solid fa-circle-check"></i>
  </h3>
  <p>Welcome back! Redirecting...</p>
  `;
  container.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "1";
  }, 100);

  (registerSection.style.filter = "blur(10px)"),
    (ghostSection.style.filter = "blur(10px)");

  setTimeout(() => {
    document.location.href = "index.html";
  }, 2000);
};

const init = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isUserValid(), isLoginPasswordValid();
    if (isUserValid() && isLoginPasswordValid()) {
      console.log("watefac");
      formLoginMsgs("Valid username", userSpan, true),
        formLoginMsgs("Valid password", passwordLoginSpan, true),
        updateLocalStorageLoginState(usernameInput.value),
        accountLogged();
    } else if (isUserValid() && !isLoginPasswordValid()) {
      formLoginMsgs("Valid username", userSpan, true);
    } else if (usernameInput.value && !isUserValid() && !passwordInput.value) {
      formLoginMsgs("Username or email is not registered.", userSpan, false);
    } else if (
      usernameInput.value &&
      !isUserValid() &&
      passwordInput.value &&
      !isLoginPasswordValid()
    ) {
      formLoginMsgs("Username or email is not registered.", userSpan, false),
        (passwordLoginSpan.style.opacity = "0");
    }
  });
};

init();
