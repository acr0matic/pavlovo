/* global Swiper */

const headerMenu = document.querySelectorAll('#header .nav__item, .header__action');
const sectionSlider = new Swiper('#section-slider', {
  speed: 500,
  mousewheel: true,
  simulateTouch: false,
});

sectionSlider.on('slideChange', () => {
  const index = sectionSlider.realIndex - 1;

  headerMenu.forEach((item) => item.classList.remove('nav__item--current'));
  if (headerMenu[index]) headerMenu[index].classList.add('nav__item--current');
});

function SetAnchors(menu) {
  menu.forEach((item, index) => {
    item.addEventListener('click', () => {
      sectionSlider.slideTo(index + 1);
    });
  });
}

SetAnchors(headerMenu);
