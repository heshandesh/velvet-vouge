let currentIndex = 0;
let images;

function showCurrentImage() {
  images = document.querySelectorAll(".banner-container .banner-images .image");
  images.forEach((img, index) => {
    img.style.display = index === currentIndex ? "block" : "none";
  });
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  showCurrentImage();
}, 15000);

showCurrentImage();
