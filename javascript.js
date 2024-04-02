const menuBtn = document.querySelector('.menu-btn')
const navlinks = document.querySelector('.nav-links')
menuBtn.addEventListener('click',()=>{
    navlinks.classList.toggle('mobile-menu')
})


document.addEventListener("DOMContentLoaded", function() {
    var currentIndex = 0;
    var slides = document.querySelectorAll('.slide');
    // Assume each slide is shown for 8 seconds total
    var slideInterval = 8000; 
  
    function showSlide(index) {
      slides.forEach(function(slide) {
        slide.style.opacity = '0';
      });
  
      var currentSlide = slides[index];
      currentSlide.style.opacity = '1'; 
      
      // Reapply the animation to ensure it starts from the beginning for each slide
      var img = currentSlide.querySelector('img');
      img.style.animation = 'none'; // Reset the animation
      // Trigger reflow to apply the reset
      void img.offsetWidth;
      // Re-apply the correct animation based on the slide index
      switch (index % 4) {
        case 0:
          img.style.animation = 'panRight 10s ease-in-out infinite';
          break;
        case 1:
          img.style.animation = 'panDown 10s ease-in-out infinite';
          break;
        case 2:
          img.style.animation = 'panLeft 10s ease-in-out infinite';
          break;
        case 3:
          img.style.animation = 'panUp 10s ease-in-out infinite';
          break;
      }
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }
  
    // Initially display the first slide
    showSlide(currentIndex);
    // Set the interval for changing slides, adjusted to match the CSS transition
    setInterval(nextSlide, slideInterval);
  });