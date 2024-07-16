document.addEventListener('DOMContentLoaded', function() {

  // Sticky header
  window.addEventListener('scroll', function() {
    if (window.scrollY > 1) {
      document.querySelector(".header-area").classList.add("sticky");
    } else {
      document.querySelector(".header-area").classList.remove("sticky");
    }
  
    // Update active section in the header
    updateActiveSection();
  });
  
  // Click on navigation links
  var navLinks = document.querySelectorAll(".header ul li a");
  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(e) {
      e.preventDefault();
  
      var target = navLink.getAttribute("href");
  
      if (document.querySelector(target).classList.contains("active-section")) {
        return;
      }
  
      if (target === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        var offset = document.querySelector(target).offsetTop - 40;
  
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
  
      navLinks.forEach(function(link) {
        link.classList.remove("active");
      });
      navLink.classList.add("active");
    });
  });

  // Initial content revealing with ScrollReveal.js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Submit form data to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(function(response) {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function() {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch(function(error) {
        console.error('Error!', error.message);
      });
  });

  // Toggle mobile menu
  document.querySelector(".menu_icon").addEventListener('click', function() {
    document.querySelector(".header ul").classList.toggle("show");
  });

});

// Function to update active section in navigation based on scroll position
function updateActiveSection() {
  var scrollPosition = window.scrollY;

  document.querySelectorAll('section').forEach(function(section) {
    var sectionOffset = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionOffset - 100 && scrollPosition < sectionOffset + sectionHeight - 100) {
      document.querySelector('.header ul li a[href="#' + sectionId + '"]').classList.add('active');
    } else {
      document.querySelector('.header ul li a[href="#' + sectionId + '"]').classList.remove('active');
    }
  });
}

// Function to open links in a new tab
function openLink(url) {
  window.open(url, '_blank');
}
