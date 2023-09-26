// this will request a country by name
// eg. https://restcountries.com/v3.1/name/italy will give us all the info about italy.
// this will give us an array. noticed that for Iran it gave us the cook islands since it had iran in it's name (Kūki 'Āirani) so we'll have to check the input and the stuff we get back, so only what the user want sis displayed.
// we might want to trim the input value, also first turn the value into lowercase, then capitalize the first letter. since the JSON format also spits back the names like: Iran Italy Hungary etc.
// what we want to display are the following:
// name
// the location of the country (for example hungary, and we display that it is in europe)

const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search__button");
const displayedCountry = document.querySelector("#displayed__country");

window.addEventListener("load", () => {
  searchInput.value = ""; // first we should set the input field to nothing
});

async function requestCountryByName(inputValue) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${inputValue}`
    ); // we want to use literals to dynamically insert stuff.
    const country = await res.json();
    console.log(country);
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchButton.addEventListener("click", () => {
  let inputValue = searchInput.value;
  if (inputValue === "" || inputValue === null) {
    alert("You have to populate the search bar, before you can search");
  }
  requestCountryByName(inputValue);
});
