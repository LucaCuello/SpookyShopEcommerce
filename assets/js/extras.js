const spiderBody = document.getElementById("spider-body"),
  spider = document.getElementById("spider"),
  ghost = document.getElementById("ghost-icon");

const hidingSpider = () => {
  spiderBody.addEventListener("click", () => {
    spider.classList.remove("normalanimation");
    spider.classList.add("hideanimation");
    setTimeout(() => {
      spider.addEventListener("animationend", () => {
        spider.classList.remove("hideanimation");
        spider.classList.add("commingbackanimation");
        spider.addEventListener("animationend", () => {
          spider.classList.remove("commingbackanimation");
          spider.classList.add("normalanimation");
        });
      });
    }, 2000);
  });
};

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
  hidingSpider();
  dissappearGhost();
};

init();
