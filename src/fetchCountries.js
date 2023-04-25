import Notiflix from 'notiflix';

const URL_BASE = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
    const fields = 'name,capital,population,flags,languages';
    const url = `${URL_BASE}${name}?fields=${fields}`;
    
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (response.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                reject(new Error(`Not found! Status: ${response.status}`));
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            const countries = data.map(country => {
                const {
                    name: { official },
                    capital,
                    population,
                    flags,
                    languages
                } = country;
                const svg = flags && flags.svg ? flags.svg : null;
                const countryLanguages = languages ? Object.values(languages) : [];
                return {
                    name: official,
                    capital,
                    population,
                    flags: svg,
                    languages: countryLanguages
                };
            });
            resolve(countries);
        } catch (err) {
            reject(err);
        }
    });
}

export { fetchCountries };