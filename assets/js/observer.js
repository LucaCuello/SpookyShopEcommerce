const sections = document.querySelectorAll(".scroll-reveal-off");

const options = {
  threshold: 0.25,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("scroll-reveal-on");
    observer.unobserve(entry.target);
  });
}, options);

// Making sure that the opacity animation from the intersection observer starts right away if the loader has already been shown. Otherwise, it'll start after the loader finishes.

if (sessionStorage.getItem("loaderShownOnMainPage")) {
  setTimeout(() => {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }, 900);
} else {
  setTimeout(() => {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }, 2600);
}
