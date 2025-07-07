document.addEventListener("DOMContentLoaded", () => {
  // Dynamically set visibleCount based on screen width
  let visibleCount = window.innerWidth <= 600 ? 5 : 11; // 5 for mobile, 11 for desktop

  let currentIndex = 0;
  let imageList = [];
  let totalImages = 0;

  const ribbon = document.getElementById("thumbnailRibbon");
  const captionText = document.getElementById("caption");

  function updateMainDisplay() {
    const slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if (slides[currentIndex]) {
      slides[currentIndex].style.display = "block";
    }
    if (captionText && imageList[currentIndex]) {
      captionText.innerText = imageList[currentIndex].caption;
    }
  }

  function getWrappedIndex(i) {
    return (i + totalImages) % totalImages;
  }

  function renderCarousel() {
    ribbon.innerHTML = "";
    const half = Math.floor(visibleCount / 2);
    for (let offset = -half; offset <= half; offset++) {
      const index = getWrappedIndex(currentIndex + offset);
      const img = document.createElement("img");
      img.src = imageList[index].src;
      img.alt = imageList[index].caption;
      img.className = "thumbnail";
      img.style.transition = "transform 0.4s ease, opacity 0.4s ease";

      const distance = Math.abs(offset);
      const scale = 1 - (distance * 0.08);
      const opacity = 1 - (distance * 0.15);

      img.style.transform = `scale(${scale})`;
      img.style.opacity = `${Math.max(opacity, 0.6)}`;

      if (offset === 0) img.classList.add("active");

      img.onclick = () => {
        currentIndex = index;
        updateMainDisplay();
        renderCarousel();
      };
      ribbon.appendChild(img);
    }
  }

  window.plusSlides = function(n) {
    currentIndex = getWrappedIndex(currentIndex + n);
    updateMainDisplay();
    renderCarousel();
  };

  window.currentSlide = function(n) {
    currentIndex = getWrappedIndex(n);
    updateMainDisplay();
    renderCarousel();
  };

  function getGalleryName() {
    const params = new URLSearchParams(window.location.search);
    // Allow 'america', 'vietnam', and 'australia' as valid galleries, default to 'america'
    const gallery = params.get('gallery');
    if (gallery === 'vietnam' || gallery === 'america' || gallery === 'australia' || gallery === 'newzealand') {
      return gallery;
    }
    return 'america';
  }

  const galleryName = getGalleryName();
  fetch(`${galleryName}.json`)
    .then(response => response.json())
    .then(images => {
      const slideshow = document.getElementById('slideshow-container');

      // Clear any existing slides
      slideshow.innerHTML = '';
      ribbon.innerHTML = '';

      // Store image data for navigation
      imageList = images;
      totalImages = images.length;

      images.forEach((img, i) => {
        // Slides
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';
        slide.style.display = 'none'; // Hide all slides initially
        slide.innerHTML = `<img src="${img.src}" style="width:${img.width}">`;
        slideshow.appendChild(slide);
      });

      // Show the first slide and render the ribbon
      currentIndex = 0;
      updateMainDisplay();
      renderCarousel();
    });

  // Optionally, update visibleCount on window resize
  window.addEventListener("resize", () => {
    visibleCount = window.innerWidth <= 600 ? 5 : 11;
    renderCarousel();
  });
});
