document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const content = document.querySelector(".content");
    const header = document.getElementById("header");
    const doc = document.querySelector(".apply__blur");
  
    menuBtn.addEventListener("click", function() {
      menu.classList.toggle("open");
      doc.classList.toggle("blur"); //Global
    });
  
    overlay.addEventListener("click", function() {
      menu.classList.remove("open");
      doc.classList.remove("blur"); //Global
    });
  
    // Cierra el menú al hacer clic en el botón de cerrar menú
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    closeMenuBtn.addEventListener("click", function() {
      menu.classList.remove("open");
      overlay.classList.remove("open");

      doc.classList.remove("blur"); //Global
    });
  });
  