/* global Swiper, MicroModal */

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

MicroModal.init({
  awaitCloseAnimation: true,
  disableFocus: true,
});

const modalTitle = document.querySelector('#modal-info .modal__title');
const modalText = document.querySelector('#modal-info .modal__description');
const projectCards = document.querySelectorAll('#about .about__item');

projectCards.forEach((card) => {
  const title = card.querySelector('.about__stage').innerHTML;
  const text = card.querySelector('.about__description').innerHTML;
  const button = card.querySelector('.about__action');

  button.addEventListener('click', () => {
    modalTitle.innerHTML = title;
    modalText.innerHTML = text;
  });
});
