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

  // Dropdown "Outros": clique alterna (além do hover), e fecha ao clicar fora
  document.querySelectorAll(".nav-sub-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.parentElement;
      var open = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-sub.open").forEach(function (li) {
      if (!li.contains(e.target)) {
        li.classList.remove("open");
        var b = li.querySelector(".nav-sub-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Ano atual no rodapé
  var y = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  y.forEach(function (el) { el.textContent = year; });
})();
