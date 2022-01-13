import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import renderCountries from './renderCountries';
import renderCountry from './renderCountry';

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

refs.searchCountry.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(event) {
  event.preventDefault();
  const inputCountry = event.target.value.trim();
  // console.log(inputCountry);
  if (!inputCountry) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(inputCountry)
    .then(countries => {
      // console.log(countries);
      if (countries.length === 1) {
        renderMarkup(refs.countryInfo, renderCountry(countries));
        renderMarkup(refs.countryList, '');
        return;
      }
      if (countries.length > 1 && countries.length <= 10) {
        renderMarkup(refs.countryList, renderCountries(countries));
        renderMarkup(refs.countryInfo, '');
        return;
      }
      if (countries.length > 10) {
        notiflixInfo(info);
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        // console.log(notiflixInfo(info));
        return;
      }
    })
    .catch(error => notiflixWarning(warning));
}

function renderMarkup(where, what) {
  where.innerHTML = what;
}
