// Dark Mode functionality
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.toggle("dark-mode");
  });

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
}

function checkDarkMode() {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.add("dark-mode");
    });
  }
}

let allCountries = [];

// Fetch country data
async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    allCountries = await response.json();
    displayCountries(allCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Display all countries
function displayCountries(countries) {
  const countryList = document.getElementById("countryList");
  countryList.innerHTML = "";

  countries
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("card", "dark-mode");
      countryCard.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} Flag">
          <h3>${country.name.common}</h3>
      `;

      countryCard.addEventListener("click", () => showCountryInfo(country));

      countryList.appendChild(countryCard);
    });
}

// Search function to filter countries by name
function searchCountries() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  displayCountries(filteredCountries);
}

// Filter countries by selected continent
function filterByContinent() {
  const selectedContinent = document.getElementById("continentSelect").value;
  let filteredCountries = allCountries;

  if (selectedContinent) {
    filteredCountries = allCountries.filter(
      (country) => country.region === selectedContinent
    );
  }

  displayCountries(filteredCountries);
}

// Modal functionality
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function showCountryInfo(country) {
  modal.style.display = "block";
  modalContent.innerHTML = `
      <h2>${country.name.common}</h2>
      <img src="${country.flags.png}" alt="${country.name.common} flag">
      <p><strong>Столица:</strong> ${country.capital ? country.capital[0] : "Неизвестно"}</p>
      <p><strong>Регион:</strong> ${country.region}</p>
      <p><strong>Население:</strong> ${country.population.toLocaleString()}</p>
  `;
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

fetchCountries();
checkDarkMode();
