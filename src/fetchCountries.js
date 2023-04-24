import Notiflix from 'notiflix';

const URL_BASE = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${URL_BASE}${name}`);
            if (response.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                reject(new Error(`Not found! Status: ${response.status}`));
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const countries = data.map(country => {
                return {
                    name: country.name.official,
                    capital: country.capital,
                    population: country.population,
                    flag: country.flags.svg,
                    languages: Object.values(country.languages).join(', ')
                };
            });
            resolve(countries);
        } catch (err) {
            reject(err);
        }
    });
}

export { fetchCountries };