function sayHello() {
    alert('Welcome to UNIC.');
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const areas = document.querySelectorAll("area[data-section]");
    const sections = document.querySelectorAll(".section-text");
  
    areas.forEach(area => {
      area.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = area.dataset.section;
  
        sections.forEach(section => {
          if (section.id === targetId) {
            section.classList.add("visible");
          } else {
            section.classList.remove("visible");
          }
        });
      });
    });
  });
  