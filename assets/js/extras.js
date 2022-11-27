const ghost = document.getElementById("ghost-icon");

const dissappearGhost = () => {
  ghost.addEventListener("click", () => {
    ghost.classList.add("ghost-animation");
    setTimeout(() => {
      ghost.classList.remove("ghost-animation");
      ghost.style.opacity = "0";
      setTimeout(() => {
        ghost.style.opacity = "1";
      }, 400);
    }, 3500);
  });
};

const init = () => {
  dissappearGhost();
};

init();
