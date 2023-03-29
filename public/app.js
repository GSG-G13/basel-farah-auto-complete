const searchInput = document.querySelector("header .search-input input");
const searchSuggestions = document.querySelector("header .search-options");
const searchResults = document.querySelector(".search-results");
const gallery = document.getElementById("image-gallery");
searchInput.addEventListener("input", handleInput);

function handleInput() {
  const value = searchInput.value.trim();
  getSearchSuggestions(value);
}

function fetchData(url) {
  return fetch(url).then((response) => response.json());
}

function getSearchSuggestions(query) {
  fetchData(`/countries/${query}`)
    .then((data) => {
      displaySearchSuggestions(data);
    })
    .catch((error) => {
      console.log("Error:", error);
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
      displayImageGallery(suggestion);

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
  fetchData(`https://restcountries.com/v2/name/${query}`)
    .then((data) => {
      displaySearchResults(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function displaySearchResults(results) {
  const country = results[0];
  document.querySelector(".flip-card-front img").src = country.flags.svg;
  document.querySelector(".capital span").textContent = country.capital;
  document.querySelector(".currency span").textContent = Object.values(
    country.currencies
  )[0].name;
  document.querySelector(".population span").textContent =
    country.population.toLocaleString();
  };
  function displayImageGallery(query) {
    const imageGallery = document.querySelector('#image-gallery');
    fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=6`, {
      headers: {
        Authorization: 'Client-ID 6aLc2g_FnKCMK7lDo6WWCQmBiSfXRsXMycs2SHwr0o0'
      }
    })
      .then(response => response.json())
      .then(data => {
        imageGallery.innerHTML = '';
        const images = data.results;
        images.forEach(image => {
          const img = document.createElement('img');
          img.src = image.urls.regular;
          img.alt = image.alt_description;
          imageGallery.appendChild(img);
        });
      })
      .catch(error => console.error(error));
  }
  