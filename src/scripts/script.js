/* global Swiper, MicroModal */

const headerMenu = document.querySelectorAll('#header .nav__item, .header__action');
let sectionSlider = null;

if (window.matchMedia('(min-width: 991px)').matches) {
  sectionSlider = new Swiper('#section-slider', {
    speed: 500,
    mousewheel: true,
    simulateTouch: false,
  });

  sectionSlider.on('slideChange', () => {
    const index = sectionSlider.realIndex - 1;

    headerMenu.forEach((item) => item.classList.remove('nav__item--current', 'nav__item--inverted'));
    if (headerMenu[index]) headerMenu[index].classList.add('nav__item--current');
    if (index === 2) headerMenu[0].classList.add('nav__item--inverted');
  });
}

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

const map = document.getElementById('map');
const mapImage = map.querySelector('.map__image');
const points = map.querySelectorAll('#map .map__point');

function hideAll() {
  points.forEach((point) => {
    point.classList.add('map__point--hide');
  });
}

points.forEach((point) => {
  point.addEventListener('click', () => {
    const width = 0;
    const height = 0;

    const x = point.offsetLeft - width;
    const y = point.offsetTop - height;

    mapImage.style.transformOrigin = `${x}px ${y}px`;
    mapImage.style.transform = 'scale(4)';

    hideAll();
  });
});
