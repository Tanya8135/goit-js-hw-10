// const BASE_URL = 'https://restcountries.com/v3.1/name/{name}';

// async function fetchCountries(name) {
//     try {
//         const resp = await fetch(`${BASE_URL}${name}`);
//         if (!resp.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await resp.json();
//         if (data.length === 0) {
//             throw new Error('No country data found');
//         }
//         const countryData = {
//             name: data[0]?.name?.official || '',
//             capital: data[0]?.capital || '',
//             population: data[0]?.population || '',
//             flag: data[0]?.flags?.svg || '',
//             languages: data[0]?.languages || []
//         };
//         return countryData;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// export { fetchCountries };


function fetchCountries(name) {
    return new Promise((resolve, reject) => {
        fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                if (!response.ok) {
                    reject(new Error(`HTTP error! Status: ${response.status}`));
                }
                return response.json();
            })
            .then(data => {
                const countries = data.map(country => {
                    return {
                        name: country.name.official,
                        capital: country.capital,
                        population: country.population,
                        flag: country.flags.svg,
                        languages: country.languages
                    };
                });
                resolve(countries);
            })
            .catch(err => reject(err));
    });
}

export { fetchCountries };