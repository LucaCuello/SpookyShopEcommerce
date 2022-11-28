const hamburgerContainer = document.querySelector(".hamburger"),
  hamburgerPopUp = document.querySelector(".hamburger-popup"),
  overlay = document.querySelector(".overlay");

const openPopUp = () => {
  hamburgerPopUp.classList.toggle("popup-active");
  // Manage z-index of icons so they don't interfere
  blurCartMenu();
  // Close popup if user scrolls the page
  closePopUpOnScroll();
  // Activate blurred overlay
  activateOverlay();
  // Close popup if user clicks outside
  closeOnBlur();
};

const blurCartMenu = () => {
  let desktopCartIcon = document.querySelector(".desktop-cart"),
    mobileCartIcon = document.querySelector(".mobile-cart");

  if (!desktopCartIcon && !mobileCartIcon) {
    return;
  }
  hamburgerContainer.style.zIndex = "20";
  desktopCartIcon.style.zIndex = "14";
  mobileCartIcon.style.zIndex = "14";
};

const burgerIconTransform = () => {
  hamburgerContainer.classList.toggle("hamburger-active");
  openPopUp();
};

const closePopUpOnScroll = () => {
  hamburgerPopUp.addEventListener("transitionend", () => {
    document.addEventListener("scroll", () => {
      overlay.classList.remove("overlay-active");
      hamburgerPopUp.classList.remove("popup-active");
      hamburgerContainer.classList.remove("hamburger-active");
    });
  });
};

const closeOnBlur = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      overlay.classList.remove("overlay-active");
      hamburgerPopUp.classList.remove("popup-active");
      hamburgerContainer.classList.remove("hamburger-active");
    }
  });
};

const activateOverlay = () => {
  overlay.classList.toggle("overlay-active");
};

const hamburgerInit = () => {
  hamburgerContainer.addEventListener("click", burgerIconTransform);
};

hamburgerInit();
