const searchInput = document.querySelector("header .search-input input");
const searchSuggestions = document.querySelector("header .search-options");
const searchResults = document.querySelector(".search-results");
searchInput.addEventListener("input", handleInput);

function handleInput() {
  const value = searchInput.value.trim();
  getSearchSuggestions(value);
}

const fetchData = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      cb(data);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};

function getSearchSuggestions(query) {
  fetchData(`/countries/${query}`, (data) => {
    displaySearchSuggestions(data);
  });
}

function displaySearchSuggestions(suggestions) {
  searchSuggestions.textContent = "";
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.textContent = suggestion;
    suggestionElement.classList.add("suggestion");
    suggestionElement.addEventListener("click", () => {
      searchInput.value = suggestion;
      searchSuggestions.textContent = "";
      searchSuggestions.classList.remove("scroll-add");
      searchInput.value = "";
      getSearchResults(suggestion);
    });
    searchSuggestions.appendChild(suggestionElement);
  });
  if (suggestions.length >= 4) {
    searchSuggestions.classList.add("scroll-add");
  } else {
    searchSuggestions.classList.remove("scroll-add");
  }
}

function getSearchResults(query) {
  fetchData(`https://restcountries.com/v2/name/${query}`, (data) => {
    displaySearchResults(data);
  });
}

function displaySearchResults(results) {
  const country = results[0];
  document.querySelector(".flip-card-front img").src = country.flags.svg;
  document.querySelector(".capital span").textContent = country.capital;
  document.querySelector(".population span").textContent =
    country.population.toLocaleString();
  // const flag = country.flags.svg;
  // const capital = country.capital[0];
  // const population = country.population;
  // const currency = Object.values(country.currencies)[0].name;

  // const flagElement = document.createElement("img");
  // flagElement.src = flag;
  // flagElement.alt = `${country.name.common} flag`;
  // searchResults.appendChild(flagElement);

  // const capitalElement = document.createElement("p");
  // capitalElement.textContent = `Capital: ${capital}`;
  // searchResults.appendChild(capitalElement);

  // const populationElement = document.createElement("p");
  // populationElement.textContent = `Population: ${population.toLocaleString()}`;
  // searchResults.appendChild(populationElement);

  // const currencyElement = document.createElement("p");
  // currencyElement.textContent = `Currency: ${currency}`;
  // searchResults.style.padding = "20px";
  // searchResults.appendChild(currencyElement);
}
