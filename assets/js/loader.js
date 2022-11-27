const body = document.querySelector("body"),
  loader = document.querySelector(".loader-container");

// Based on the session storage, the loader will take 2,5 seconds if the user just opened the page. Otherwise, the loader animation will only appear for less than a second.

export const showLoader = (sessionInfo, sessionStorageKey = "") => {
  if (sessionInfo) {
    body.style.overflow = "hidden";
    setTimeout(() => {
      loader.style.transform = "translateY(-100vh)";
      body.style.overflow = "auto";
    }, 800);
    return;
  } else {
    body.style.overflow = "hidden";
    setTimeout(() => {
      loader.style.transform = "translateY(-100vh)";
      body.style.overflow = "auto";
    }, 2500);
    sessionStorage.setItem(`${sessionStorageKey}`, true);
  }
};
