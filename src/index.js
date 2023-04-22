// import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');
// const DEBOUNCE_DELAY = 300;

// searchBox.addEventListener('input', debounce(handleSearchInput, DEBOUNCE_DELAY));

// async function handleSearchInput(evt) {
//     const searchValue = evt.target.value.trim(); /* введення без пробілів (виключення) */
//     if (searchValue === '') {
//         clearCountryList();
//         clearCountryInfo();
//         return;
//     }

//     try {
//         const countries = await fetchCountries(searchValue);

//         if (countries.length > 10) {
//             Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
//             clearCountryList();
//             clearCountryInfo();
//             return;
//         }

//         if (countries.length > 1) {
//             renderCountryList(countries);
//             clearCountryInfo();
//             return;
//         }

//         if (countries.length === 0) {
//             Notiflix.Notify.failure('No matches found. Please enter a valid name.');
//             clearCountryList();
//             clearCountryInfo();
//             return;
//         }

//         // Відображення даних про країну
//         renderCountryInfo(countries[0]);
//         clearCountryList();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// function renderCountryInfo(countryData) {
//     if (!countryData) {
//         console.error('Country data is undefined or null');
//         return;
//     }
//     countryInfo.innerHTML = `
//           <h2>${countryData.officialName || ''}</h2>
//           <p><strong>Capital:</strong> ${countryData.capital || ''}</p>
//           <p><strong>Population:</strong> ${countryData.population || ''}</p>
//           <img src="${countryData.flag || ''}" alt="Flag of ${countryData.officialName || ''}" class="country-flag">
//           <p><strong>Languages:</strong> ${countryData.languages ? countryData.languages.join(', ') : ''}</p>
//         `;
// }

// function clearCountryList() {
//     countryList.innerHTML = '';
// }

// function clearCountryInfo() {
//     countryInfo.innerHTML = '';
// }

// function renderCountryList(countries) {
//     countryList.innerHTML = '';

//     countries.forEach(country => {
//         const countryItem = document.createElement('li');
//         countryItem.classList.add('country-item');
//         countryItem.textContent = country.name;

//         countryList.appendChild(countryItem);
//     });
// }


import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const handleInput = debounce((event) => {
    const searchTerm = event.target.value.trim(); /* санітизація введеного рядка */
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
                    Notiflix.Notify.failure('Oops, there is no country with that name.');
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
        const countriesItem = document.createElement('div');
        countriesItem.innerHTML = `<img src="${country.flag}" alt="${country.name}" class="flag"><span>${country.name}</span>`;
        countryList.appendChild(countriesItem);
    });
}

// Використання функції fetchCountries:
fetchCountries('Ukraine')
    // .then(countries => {
    //     console.log(countries);
    // })
    // .catch(err => {
    //     console.error(err);
    // });