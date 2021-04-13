/* global Swiper, MicroModal */

const headerMenu = document.querySelectorAll('#header .header__nav .nav__item, .header__action');
let sectionSlider = null;

if (window.matchMedia('(min-width: 991px)').matches) {
  sectionSlider = new Swiper('#section-slider', {
    speed: 1000,
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
  disableScroll: true,
});

const modalTitle = document.querySelector('#modal-info .modal__title');
const modalText = document.querySelector('#modal-info .modal__description');
const modalPicture = document.querySelector('#modal-info .modal__picture');
const projectCards = document.querySelectorAll('#about .about__item');

projectCards.forEach((card) => {
  const title = card.querySelector('.about__stage').innerHTML;
  const text = card.querySelector('.about__content').innerHTML;
  const button = card.querySelector('.about__action');

  const source = card.querySelector('.about__picture source').getAttribute('srcset').slice(0, -11);
  const img = card.querySelector('.about__picture img').getAttribute('src').slice(0, -10);

  button.addEventListener('click', () => {
    modalTitle.innerHTML = title;
    modalText.innerHTML = text;
    modalPicture.querySelector('source').setAttribute('srcset', `${source}-full.webp`);
    modalPicture.querySelector('img').setAttribute('src', `${img}-full.jpg`);
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

const buttonSurvey = document.querySelector('.hero__action .button-primary');
const buttonContact = document.querySelector('.hero__action .button-outline');

function Scroll(element) {
  const link = element.getAttribute('href').slice(1);
  const section = document.getElementById(link);

  section.scrollIntoView({
    behavior: 'smooth',
  });
}

buttonSurvey.addEventListener('click', () => {
  if (window.matchMedia('(min-width: 991px)').matches) {
    sectionSlider.slideTo(1);
  } else {
    Scroll(buttonSurvey);
  }
});

buttonContact.addEventListener('click', () => {
  if (window.matchMedia('(min-width: 991px)').matches) {
    sectionSlider.slideTo(5);
  } else {
    Scroll(buttonContact);
  }
});

const mobileMenu = document.querySelector('#mobile-menu .mobile-menu');
const headerMobile = document.querySelector('.header .header__mobile');
const mobileMenuButton = headerMobile.querySelector('.hamburger');
const mobileNav = mobileMenu.querySelectorAll('.nav__link');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-menu--open');
  mobileMenuButton.classList.toggle('is-active');

  headerMobile.classList.toggle('header__mobile--fixed');
});

mobileNav.forEach((item) => {
  item.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu--open');
    mobileMenuButton.classList.toggle('is-active');
    headerMobile.classList.toggle('header__mobile--fixed');

    Scroll(item);
  });
});

// sideOverlay.addEventListener('click', (e) => {
//   if (e.target !== sideMenuWrapper && !sideMenuWrapper.contains(e.target)) {
//     sideMenu.classList.remove('side-menu--open');
//     sideMenuButton.classList.remove('is-active');
//   }
// });