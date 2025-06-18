// import { signup, login, logout, getUser } from "./auth.js";

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.setAttribute(
    "aria-expanded",
    burger.getAttribute("aria-expanded") === "false" ? "true" : "false"
  );
});

// Fermer le menu en cliquant ailleurs
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
  }
});

// Animation smooth
document.querySelector(".a2").addEventListener("click", function (e) {
  e.preventDefault();
  const targetId = this.getAttribute("href").substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
});
