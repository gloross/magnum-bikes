window.onload=function click(){
  const trigger = document.getElementById("triger");

  if (trigger) {
    trigger.click();
  }
};

const swiperButton = document.getElementsByClassName("swiper-slide-next, swiper-slide-prev");

if (swiperButton.length) {
  const linkCarousel = swiperButton.getElementsByClassName("link-carousel");

  if (linkCarousel.length) {
    linkCarousel.disabled = true;
  }
}
