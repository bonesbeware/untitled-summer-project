document.addEventListener("DOMContentLoaded", () => {
  const totalImages = 20;
  const visibleCount = 11;
  let currentIndex = 0;

  const ribbon = document.getElementById("thumbnailRibbon");
  const slides = document.getElementsByClassName("mySlides");
  const captionText = document.getElementById("caption");

  // Use data from HTML thumbnails for image src and alt
  const thumbnailsHTML = document.querySelectorAll("#thumbnailRibbon .thumbnail");
  const imageList = Array.from(thumbnailsHTML).map(img => ({
    src: img.src,
    alt: img.alt
  }));

  function updateMainDisplay() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if (slides[currentIndex]) {
      slides[currentIndex].style.display = "block";
    }
    if (captionText && imageList[currentIndex]) {
      captionText.innerText = imageList[currentIndex].alt;
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
      img.alt = imageList[index].alt;
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

  updateMainDisplay();
  renderCarousel();
});
