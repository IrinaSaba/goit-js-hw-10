export default function renderCountry(countries) {
  const markup = countries
    .map(country => {
      // console.log(country);
      return `<p><img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="30" height="28"/>${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  return markup;
}
