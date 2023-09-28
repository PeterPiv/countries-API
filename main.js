// this will request a country by name
// eg. https://restcountries.com/v3.1/name/italy will give us all the info about italy.
// this will give us an array. noticed that for Iran it gave us the cook islands since it had iran in it's name (Kūki 'Āirani) so we'll have to check the input and the stuff we get back, so only what the user want sis displayed.
// we might want to trim the input value, also first turn the value into lowercase, then capitalize the first letter. since the JSON format also spits back the names like: Iran Italy Hungary etc.
// what we want to display are the following:
// name
// the location of the country (for example hungary, and we display that it is in europe)

// we are using https://restcountries.com , thanks for the free api

const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search__button");
const displayedCountry = document.querySelector("#displayed__country");
const countryFlag = document.querySelector("#flag");
const countryName = document.querySelector("#country__name");
const countryLocation = document.querySelector("#country__location");
const countryInfo = document.querySelector("#country__info");

window.addEventListener("load", () => {
  searchInput.value = "";
});
const countries = [];

async function requestCountryByName(inputValue) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${inputValue}`);
    const results = await res.json();
    countries.splice(0, countries.length);
    const upperCaseSearch = searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
    console.log(upperCaseSearch);
    countries.push(...results);
    for (const country of results) {
      if (country.name.common === upperCaseSearch) {
        console.log(country); // now its working how we want it to. we search iran, lowercase, it gets turned into uppercase, and since we check the common name it won't insert stuff like Kūki Āirani
        countryFlag.src = country.flags.png;
        countryName.firstChild.textContent = country.name.common;
        countryLocation.firstChild.textContent = country.region;
        countryInfo.firstChild.textContent = country.capital;
      }
    }
  } catch (error) {
    console.log(error);
  }
  searchInput.value = "";
}

//currently if the input value is done right. ie. we want to search for italy and actually write italy, it works. also the search is not case sensitive so we can have italy, Italy or even ItaLy it will still work.
// we are also trimming just in case so "   italy   " becomes "italy" and it still works.

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchButton.addEventListener("click", () => {
  let inputValue = searchInput.value.trim();
  if (inputValue === "" || inputValue === null) {
    alert("You have to populate the search bar, before you can search");
  }
  if (inputValue.includes(" ")) {
    inputValue = inputValue.replace(" ", "%20");
  }
  if (isNaN(searchInput.value)) {
    requestCountryByName(inputValue);
  } else {
    alert("You can't search for a number");
    searchInput.value = "";
  }
});
