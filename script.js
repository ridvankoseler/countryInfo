const url = "https://restcountries.com/v3/all";
const buttonsDiv = document.querySelector(".buttons");
const flagsDiv = document.querySelector(".flags");
const card = document.querySelector(".card");
const mySelect = document.querySelector(".mySelect");
const continent = [];

const getCountryInfo = async () => {
  card.style.display = "none";
  try {
    const res = await fetch(url);
    const countryInfo = await res.json();
    countryInfo.forEach((country) => {
      if (!continent.includes(country.region)) {
        continent.push(country.region);
        buttonsDiv.innerHTML += `<button class="btn bg-primary fw-bold text-light p-1 rounded-3 col-sm mx-2 my-1">${country.region}</button>`;
      }
      if (country.region == "Europe") {
        flagsDiv.innerHTML += `<div class="mx-2 my-2 ">
                    <img src="${country.flags[1]}" alt=""flag" width="60px" height="40px">
                    </div>`;
      }
      mySelect.innerHTML += `<option value="${country.name.common}">${country.name.common}</option>`; // adjustment for alp. order !!
    });
    buttonsDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("buttons")) {
        null;
      } else {
        flagsDiv.innerHTML = "";
        countryInfo.forEach((country) => {
          if (e.target.innerText == country.region) {
            flagsDiv.innerHTML += `<div class="mx-2 my-2">
                    <img src="${country.flags[1]}" alt=""flag" width="60px" height="40px">
                    </div>`;
          }
        });
      }
    });
    flagsDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("flags")) {
        null;
      } else {
        card.style.display = "block";
        countryInfo.forEach((country) => {
          const {
            name: { common },
            capital,
            flags,
            region,
            languages,
            currencies,
          } = country;
          if (e.target["src"] == country.flags[1]) {
            card.innerHTML = `<div class="info-card">
                                <img src="${
                                  country.flags[1]
                                }" class="card-img-top" alt="flag">
                            </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>${common}</strong></li>
                            <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i>${region}</li>
                            <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i>${capital}</li>
                            <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(
                              languages
                            )}</li>
                            <li class="list-group-item"><i class="fa-solid fa-money-bill-1-wave"></i>${
                              Object.values(currencies)[0].name
                            } ${Object.values(currencies)[0].symbol}</li>
                        </ul>`;
            mySelect.value = `${common}`;
          }
        });
      }
    });
    mySelect.addEventListener("change", (e) => {
      card.style.display = "block";
      countryInfo.forEach((country) => {
        const {
          name: { common },
          capital,
          flags,
          region,
          languages,
          currencies,
        } = country;
        if (country.name.common == mySelect.value) {
          card.innerHTML = `
                        <div class="info-card">
                            <img src="${
                              country.flags[1]
                            }" class="card-img-top" alt="flag">
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> <strong>${common}</strong></li>
                            <li class="list-group-item"><i class="fa-solid fa-earth-europe"></i>${region}</li>
                            <li class="list-group-item"><i class="fa-solid fa-landmark-flag"></i>${capital}</li>
                            <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(
                              languages
                            )}</li>
                            <li class="list-group-item"><i class="fa-solid fa-money-bill-1-wave"></i>${
                              Object.values(currencies)[0].name
                            } ${Object.values(currencies)[0].name}</li>
                        </ul>`;
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
getCountryInfo();
