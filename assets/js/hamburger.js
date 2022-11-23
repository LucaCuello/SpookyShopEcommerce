const hamburgerContainer = document.querySelector(".hamburger"),
  hamburgerPopUp = document.querySelector(".hamburger-popup"),
  overlay = document.querySelector(".overlay");

const openPopUp = () => {
  hamburgerPopUp.classList.toggle("popup-active");
  // Close popup if user scrolls the page
  closePopUpOnScroll();
  // Activate blurred overlay
  activateOverlay();
  // Close popup if user clicks outside
  closeOnBlur();
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
    if (e.target.classList.contains("overlay-active")) {
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
