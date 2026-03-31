const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

// for(code in countryList)
// {
//     console.log(code,countryList[code]);
// }
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currcode;
    newOpt.value = currcode;
    if (select.name == "from" && currcode === "USD") {
      newOpt.selected = "selected";
    }
    if (select.name == "to" && currcode === "BDT") {
      newOpt.selected = "selected";
    }
    select.append(newOpt);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval <= 0) {
    amtval = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

  //   fetch(URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let rate =
  //         data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  //       console.log(rate);
  //     });
  let res = await fetch(URL);
  let data = await res.json();
  let rate =
    data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  // console.log(rate);

  let finalAmt = (amtval * rate).toFixed(3);
  msg.innerText = `${amtval} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`;
};

const updateFlag = (ele) => {
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
