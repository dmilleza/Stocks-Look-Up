var signIn = document.querySelector('.signedIn');
var burger = document.querySelector('#burger');
var navList = document.querySelector('#navbarBasicExample');

burger.addEventListener('click', () => {
  navList.classList.toggle('is-active');
});
