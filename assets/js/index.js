const loginContainer = document.getElementById("login"),
  heroContainer = document.getElementById("hero-container");

const localStorageUserData = JSON.parse(localStorage.getItem("User")) || [];

const renderDashboard = (user) => {
  let userDashboard = document.createElement("div");
  userDashboard.classList.add("user-dashboard");
  userDashboard.innerHTML = `
  <span class="user user-tab">
    <i class="fa-solid fa-user"></i>
    <a href="#">
        ${user.user}
    </a>
  </span>
  <span>
    |
  </span>
  <span class="log-out user-tab">
      <i class="fa-solid fa-door-open"></i>
      <a href="#" id="logout">
      Logout
      </a>
  </span>
  <span class="cart">
    <i class="fa-solid fa-cart-shopping" id="cart"></i>
  </span>
  `;
  heroContainer.appendChild(userDashboard);
  document.getElementById("logout").addEventListener("click", () => {
    logOut(userDashboard, user);
  });
};

const logOut = (userDashboard, user) => {
  if (confirm("Are you sure you want to log out?")) {
    document.location.reload();
    userDashboard.style.display = "none";
    loginContainer.style.display = "flex";
    user.logged = false;
    localStorage.setItem("User", JSON.stringify(localStorageUserData));
  } else {
    return;
  }
};

const isAccountLogged = () => {
  let userData = localStorageUserData.find((e) => e.logged === true);
  if (userData && userData.logged) {
    loginContainer.style.display = "none";
    renderDashboard(userData);
  }
};

isAccountLogged();

const redirection = (button) => {
  button.addEventListener("click", () => {
    document.location.href = "shop.html";
  });
};

const initRedirection = () => {
  let shirtsShopButton = document.getElementById("shirts-shop-btn"),
    hoodiesShopButton = document.getElementById("hoodies-shop-btn"),
    mugsShopButton = document.getElementById("mugs-shop-btn");

  redirection(shirtsShopButton);
};

initRedirection();
