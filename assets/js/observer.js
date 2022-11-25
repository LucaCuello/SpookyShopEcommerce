const sections = document.querySelectorAll(".scroll-reveal-off");

const options = {
  threshold: 0.25,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    console.log(entry.target);
    entry.target.classList.add("scroll-reveal-on");
    observer.unobserve(entry.target);
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});
