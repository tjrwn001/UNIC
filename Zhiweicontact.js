document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const thankYou = document.getElementById('contactThankYou');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Use URLSearchParams instead of FormData for simple text fields
      const formData = new URLSearchParams(new FormData(form));
  
      try {
        const res = await fetch('https://unic.onrender.com/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString()
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
  