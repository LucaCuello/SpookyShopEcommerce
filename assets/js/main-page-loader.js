import { showLoader } from "./loader.js";

showLoader(
  sessionStorage.getItem("loaderShownOnMainPage"),
  "loaderShownOnMainPage"
);
