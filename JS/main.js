document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  console.log("DOM chargé");
  console.log("burger:", burger);
  console.log("navLinks:", navLinks);

  if (burger && navLinks) {
    // Gestionnaire pour le burger
    burger.addEventListener("click", (e) => {
      e.stopPropagation(); 
      navLinks.classList.toggle("active");
      burger.setAttribute(
        "aria-expanded",
        burger.getAttribute("aria-expanded") === "false" ? "true" : "false"
      );
    });

    // Gestionnaire pour fermer en cliquant ailleurs
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        navLinks.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }
});

// Animation smooth
const smoothLink = document.querySelector(".a2");
if (smoothLink) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
}
