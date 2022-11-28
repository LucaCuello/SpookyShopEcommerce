const desktopCartIcon = document.querySelector(".desktop-cart"),
  mobileCartIcon = document.querySelector(".mobile-cart"),
  cartPopup = document.querySelector(".cart-popup"),
  cartOverlay = document.querySelector(".overlay");

const openCart = () => {
  cartPopup.classList.toggle("cart-popup-active");
  blurHamburgerMenu();
  overlayOn();
  closeOnScroll();
  closeOnFocusLost();
};

const blurHamburgerMenu = () => {
  if (!hamburgerContainer) {
    return;
  }
  desktopCartIcon.style.zIndex = "20";
  mobileCartIcon.style.zIndex = "20";
  hamburgerContainer.style.zIndex = "14";
};

const closeOnScroll = () => {
  cartPopup.addEventListener("transitionend", () => {
    document.addEventListener("scroll", () => {
      overlay.classList.remove("overlay-active");
      cartPopup.classList.remove("cart-popup-active");
    });
  });
};

const closeOnFocusLost = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      overlay.classList.remove("overlay-active");
      cartPopup.classList.remove("cart-popup-active");
    }
  });
};

const overlayOn = () => {
  cartOverlay.classList.toggle("overlay-active");
};

const cartInit = () => {
  desktopCartIcon.addEventListener("click", openCart);
  mobileCartIcon.addEventListener("click", openCart);
};

cartInit();
