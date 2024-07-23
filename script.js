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


 const revealSection = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('hide-section');
        observer.unobserve(entry.target);
    });
};

const sectionObs = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.60,
});

  // Elements to animate
  const elementsToAnimate = [
    { selector: ".profile-photo, .about-content, .education", options: { origin: "left" } },
    { selector: ".profile-text, .about-skills, .internship", options: { origin: "right" } },
    { selector: ".project-title, .contact-title", options: { origin: "top" } },
    { selector: ".projects, .contact", options: { origin: "bottom" } }
  ];

  // Initialize animations for each element
  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      sectionObs.observe(element); // Use global revealConfig for consistency
    });
  });


  
  
});


// Toggle mobile menu
function toggleMenu() {
const navLinks = document.querySelector('.navbar');
 navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}









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
