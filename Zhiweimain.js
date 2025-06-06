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
  

  // form-handler.js
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');
    const thankYou = document.getElementById('thankYouMessage');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        const res = await fetch('https://unic.onrender.com/apply', {
          method: 'POST',
          body: formData
        });
  
        if (res.ok) {
          form.style.display = 'none';
          thankYou.style.display = 'block';
        } else {
          alert('There was an error submitting the form.');
        }
      } catch (err) {
        alert('Failed to submit. Please try again.');
      }
    });
  
    window.goBack = function () {
      thankYou.style.display = 'none';
      form.style.display = 'block';
      form.reset();
    };
  });
  



  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const thankYou = document.getElementById('contactThankYou');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        const res = await fetch('https://unic.onrender.com/contact', {
          method: 'POST',
          body: formData
        });
  
        if (res.ok) {
          form.style.display = 'none';
          thankYou.style.display = 'block';
        } else {
          alert('There was an error submitting the form.');
        }
      } catch (err) {
        alert('Failed to submit. Please try again.');
      }
    });
  
    window.goBackContact = function () {
      thankYou.style.display = 'none';
      form.style.display = 'block';
      form.reset();
    };
  });
  