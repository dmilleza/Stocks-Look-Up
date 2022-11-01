var signIn = document.querySelector('.signedIn');
var burger = document.querySelector('#burger');
var navList = document.querySelector('#navbarBasicExample');

burger.addEventListener('click', () => {
  navList.classList.toggle('is-active');
});

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd260607c62msh9aa714a7c4a64dfp1422a2jsn930883be9576',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

fetch(
  'https://yh-finance.p.rapidapi.com/auto-complete?q=tesla&region=US',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
