var signIn = document.querySelector('.signedIn');
var burger = document.querySelector('#burger');
var navList = document.querySelector('#navbarBasicExample');
var stockList = document.querySelector('.stockList');
var newsDiv2 = document.querySelector('.newsBox2');
var newsDiv = document.querySelector('.newsBox');
var form = document.querySelector('#stocksearch');
var columns = document.querySelector('.columns');
var about = document.querySelector('#about');
var modalBg = document.querySelector('.modal-background');
var modal = document.querySelector('.modal');
var email = document.querySelector('.email');
var password = document.querySelector('.password');
var submit = document.querySelector('.submit');
var favorite = document.getElementById('favorite');
var search = document.querySelector('#search');

burger.addEventListener('click', () => {
  navList.classList.toggle('is-active');
});

/*const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd260607c62msh9aa714a7c4a64dfp1422a2jsn930883be9576',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

function listStocks() {
  fetch(
    'https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US',
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);

      var mainList = document.createElement('ul');
      mainList.setAttribute('style', 'list-style-type: none');

      for (var i = 0; i < response.finance.result[0].quotes.length; i++) {
        var symbolName = document.createElement('li');
        symbolName.textContent = response.finance.result[0].quotes[i].symbol;
        stockList.appendChild(symbolName);
      }

      console.log(response.finance.result[0].quotes[0].symbol);
    });
}

listStocks();

const options2 = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd260607c62msh9aa714a7c4a64dfp1422a2jsn930883be9576',
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
  },
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var stockName = document.querySelector('input[name="listsearch"]');

  var url =
    'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/' +
    stockName.value +
    '/asset-profile';

  fetch(url, options2)
    .then((response) => response.json())
    .then(function (response) {
      console.log(response.assetProfile.longBusinessSummary);

      var news = document.createElement('p');
      news.textContent = response.assetProfile.longBusinessSummary;
      newsDiv2.appendChild(news);

      newsDiv2.replaceChildren(news);
    });
});*/

function favorite1() {
  var userProfile = {
    email: email.value,
    password: password.value,
  };
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

submit.addEventListener('click', function (event) {
  event.preventDefault();
  favorite1();
});

favorite.addEventListener('click', function (event) {
  event.preventDefault();
  var searchName = document.getElementById('stockSearcher').value;
  console.log(searchName);
  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  userProfile.fav = searchName;
  console.log(userProfile);
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
});

about.addEventListener('click', function () {
  modal.setAttribute.add('is-active');
});

modalBg.addEventListener('click', function () {
  modal.setAttribute.remove('is-active');
});
