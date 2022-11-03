// variables for the modal
var modal = document.querySelector('.modal');
var modalBg = document.querySelector('.modal-background');
var aboutButton = document.querySelector('#aboutThis');

// when 'about' button is clicked, it triggers Bulma modal to appear
aboutButton.addEventListener('click', function () {
  modal.classList.add('is-active');
});

// if cursor clicks outside modal box then it closes the modal
modalBg.addEventListener('click', function () {
  modal.classList.remove('is-active');
});

/* clicking on burger icon in top right corner displays 'About' and 'Check News' 
when viewing navbar on tablet and mobile */
var burger = document.querySelector('#burger');
burger.addEventListener('click', () => {
  var navList = document.querySelector('#navbarBasicExample');
  // .toggle creates a new class if it doesn't exist, then is removed when clicked again
  navList.classList.toggle('is-active');
});

// stock list API stuff
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd260607c62msh9aa714a7c4a64dfp1422a2jsn930883be9576',
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
  },
};

// function to list the top 20 trending stocks on the webpage after retrieving from API
function listStocks() {
  fetch(
    'https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US',
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);

      // creates an ordered list for the top 20 trending stocks
      var mainList = document.createElement('ol');
      mainList.setAttribute(
        'style',
        'margin-left: 10px; list-style-position: inside'
      );

      // takes the top 20 trending stocks and turns them into a list item for the ordered list
      for (var i = 0; i < response.finance.result[0].quotes.length; i++) {
        var symbolName = document.createElement('li');
        symbolName.textContent = response.finance.result[0].quotes[i].symbol;
        mainList.appendChild(symbolName);
      }

      // after all 20 list items are made, the ordered list appears in the webpage
      var stockList = document.querySelector('.stockList');
      stockList.appendChild(mainList);
      console.log(response.finance.result[0].quotes[0].symbol);
    });
}

// lists stocks when the page loads
listStocks();

// stock Business Summary API stuff
const options2 = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd260607c62msh9aa714a7c4a64dfp1422a2jsn930883be9576',
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
  },
};

var stockName = document.querySelector('#stockSearcher');
var stockText = stockName.value.trim();

// function that runs when the 'search' button is clicked
var searchButton = document.querySelector('#stocksearch');
searchButton.addEventListener('submit', function (e) {
  e.preventDefault();

  var stockName = document.querySelector('#stockSearcher');
  var stockText = stockName.value.trim();

  // if blank text box is submitted, exit function
  if (stockText === '') {
    return;
  }

  // takes the stock symbol and plugs it into news API url to search for it specifically
  var url =
    'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/' +
    stockText +
    '/asset-profile';

  fetch(url, options2)
    .then((response) => response.json())
    .then(function (response) {
      /*this function takes the Business Summary of the stock and makes 
      it appear in the news box */
      console.log(response.assetProfile.longBusinessSummary);
      var news = document.createElement('p');
      news.textContent = response.assetProfile.longBusinessSummary;
      var newsDiv2 = document.querySelector('.newsBox2');
      newsDiv2.appendChild(news);

      // if an existing Business Summary is already there, it replaces it
      newsDiv2.replaceChildren(news);
    });
});

// sets up an array to contain favorited stocks
var favorited = [];

var favoriteButton = document.getElementById('favoriteButton');
// function to add stock symbol to favorite list
favoriteButton.addEventListener('click', function () {
  var stockName = document.querySelector('#stockSearcher');
  var stockText = stockName.value.trim();
  if (stockText === '') {
    return;
  }

  // adds stock symbol to favorited array, then clears the input
  favorited.push(stockText);
  stockName.value = '';

  // stores updated favorited array in local storage, then re-renders fav list
  storeFavs();
  renderFavs();
  console.log(favorited);
});

function storeFavs() {
  // turns favorited array into string for local storage
  localStorage.setItem('favs', JSON.stringify(favorited));
}

var favList = document.querySelector('.favorites');
// takes the favorited array and displays each item with a remove(x) button
function renderFavs() {
  favList.innerHTML = '';

  for (var i = 0; i < favorited.length; i++) {
    var fav = favorited[i];

    var li = document.createElement('p');
    li.textContent = fav;
    li.setAttribute('data-index', i);

    var removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.setAttribute('style', 'margin-left: 20px');

    li.appendChild(removeButton);
    favList.appendChild(li);
  }
}

// when webpage loads, the favorited symbols that are stored are displayed
function init() {
  var storedFavs = JSON.parse(localStorage.getItem('favs'));

  if (storedFavs !== null) {
    favorited = storedFavs;
  }

  renderFavs();
}

/* when X (remove) button is clicked on, the symbol is removed from favorited
 array and the visible favorites list */
favList.addEventListener('click', function (event) {
  var element = event.target;

  if (element.matches('button') === true) {
    var index = element.parentElement.getAttribute('data-index');
    favorited.splice(index, 1);

    storeFavs();
    renderFavs();
  }
});

// runs on page load
init();
