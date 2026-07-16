// Montessori Reference — interações leves
(function () {
  "use strict";

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Fecha ao clicar num link
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Ano atual no rodapé
  var y = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  y.forEach(function (el) { el.textContent = year; });
})();
