import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const handleInput = debounce((event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== '') { /* Перевіряємо, чи не є введене значення порожнім рядком */
        fetchCountries(searchTerm)
            .then(countries => {
                if (countries.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                } else if (countries.length > 1 && countries.length <= 10) {
                    /* Оновлюємо розмітку списку країн */
                    updateCountriesList(countries);
                } else {
                    /* Очищуємо розмітку списку країн
                       якщо введене значення порожній рядок */
                    clearCountriesList();
                }
            })
            .catch(err => {
                if (err.status === 404) {
                    Notiflix.Notify.failure('Oops, there is no country with that name');
                } else {
                    console.error(err);
                }
            });
    } else {
        clearCountriesList();
    }
}, DEBOUNCE_DELAY);

/* Додаємо обробник події на input */
inputSearch.addEventListener('input', handleInput);

/* Оновлення розмітки html списку країн */
function updateCountriesList(countries) {
    countryList.innerHTML = '';
    countries.forEach(country => {
        const countryInfo = document.createElement('div');
        countryInfo.innerHTML = [
            `<li class="item-country">
            <div class="flag-box">
            <img src="${country.flag}" alt="${country.name}" class="flag">
            </div>
            <div class="info-box">
            <h2 class="title-name">${country.name}</h2>
            <p class="info-text">${country.capital}</p>
            <p class="info-text">${country.population}</p>
            <p class="info-text">${country.languages}</p>
            </div>
            </li>`].join('');
        countryList.appendChild(countryInfo);
    });
}

// Видалення списку країн
function clearCountriesList() {
    countryList.innerHTML = '';
}