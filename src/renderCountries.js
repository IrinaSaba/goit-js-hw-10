export default function renderCountries(countries) {
  const markup = countries
    .map(country => {
      // console.log(country);
      return `<li class="countries">
      <img src="${country.flags.svg}" alt="${country.name}" width="30" height="28"/><p>${country.name.official}</p>
      </li>`;
    })
    .join('');
  return markup;
}
