import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const info = 'Too many matches found. Please enter a more specific name.';
const warning = 'Oops, there is no country with that name';
const notiflixWarning = Notiflix.Notify.failure;
const notiflixInfo = Notiflix.Notify.info;

const refs = {
  searchCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchCountry.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const inputCountry = event.target.value.trim();
    // console.log(inputCountry);
    if (inputCountry) {
      fetchCountries(inputCountry)
        .then(countries => {
          // console.log(countries);
          if (countries.length > 10) {
            return notiflixInfo(info);
          }
          if (2 < countries.length < 10) {
            return renderCountries(countries);
          }
          if (countries.length < 2) {
            return renderCountry(countries);
          }
          if (countries.length === 0) {
            return (refs.countryList.innerHTML = '');
          }
        })
        .catch(error => notiflixWarning(warning));
    }
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }),
  DEBOUNCE_DELAY,
);
function renderCountry(countries) {
  const markup = countries
    .map(country => {
      // console.log(country);
      return `<p><img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="28"/>${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages}</p>`;
    })
    .join('');

  refs.countryInfo.innerHTML = markup;
}
function renderCountries(countries) {
  const markup = countries
    .map(country => {
      // console.log(country);
      return `<li class="countries">
      <img src="${country.flags.svg}" alt="${country.name}" width="30" height="28"/><p>${country.name.official}</p>
      </li>`;
    })
    .join('');

  refs.countryList.innerHTML = markup;
}
