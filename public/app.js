const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', handleInput);

function handleInput() {
    const inputValue = searchInput.value.trim();
    if (inputValue.length >= 3) {
        getSearchSuggestions(inputValue);
    } else {
        searchSuggestions.innerHTML = '';
    }
}

function getSearchSuggestions(query) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://restcountries.com/v3/name/${query}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const suggestions = data.map(country => country.name.common);
            displaySearchSuggestions(suggestions);
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send();
}

function displaySearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = suggestion;
        suggestionElement.classList.add('suggestion');
        suggestionElement.addEventListener('click', () => {
            searchInput.value = suggestion;
            searchSuggestions.innerHTML = '';
            getSearchResults(suggestion);
        });
        searchSuggestions.appendChild(suggestionElement);
    });
}

function getSearchResults(query) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://restcountries.com/v2/name/${query}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displaySearchResults(data);
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send();
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    const country = results[0];
    const flag = country.flags.svg;
    const capital = country.capital[0];
    const population = country.population;
    const currency = Object.values(country.currencies)[0].name;

    const flagElement = document.createElement('img');
    flagElement.src = flag;
    flagElement.alt = `${country.name.common} flag`;
    searchResults.appendChild(flagElement);

    const capitalElement = document.createElement('p');
    capitalElement.textContent = `Capital: ${capital}`;
    searchResults.appendChild(capitalElement);

    const populationElement = document.createElement('p');
    populationElement.textContent = `Population: ${population.toLocaleString()}`;
    searchResults.appendChild(populationElement);

    const currencyElement = document.createElement('p');
    currencyElement.textContent = `Currency: ${currency}`;
    searchResults.appendChild(currencyElement);
};

