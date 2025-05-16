import { GetAllColors } from "../../data/services/color.js";
import { GetAllGenders } from "../../data/services/gender.js";
import { GetAllSizes } from "../../data/services/size.js";
import { GetAllTypes } from "../../data/services/type.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/filter/filter.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("filter").innerHTML = data;
      document.getElementById("priceInputMin").value = 0;
      document.getElementById("priceInputMax").value = 10000;
      LoadProductColors();
      LoadProductGenders();
      LoadProductSizes();
      LoadProductTypes();
      rangeInput = document.querySelectorAll(".range-input input");
      priceInput = document.querySelectorAll(".price-input input");
      range = document.querySelector(".slider .progress");
      priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

          if (
            maxPrice - minPrice >= priceGap &&
            maxPrice <= rangeInput[1].max
          ) {
            if (e.target.className === "input-min") {
              rangeInput[0].value = minPrice;
              range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
              rangeInput[1].value = maxPrice;
              range.style.right =
                100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
          }
        });
      });

      rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

          if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
              rangeInput[0].value = maxVal - priceGap;
            } else {
              rangeInput[1].value = minVal + priceGap;
            }
          } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching content:", error));
});

let rangeInput;
let priceInput;
let range;

let priceGap = 1000;

async function LoadProductColors() {
  const data = await GetAllColors();
  console.log(data);
  const divFilterColorList = document.getElementById("divFilterColorList");
  if (!divFilterColorList) return;
  data.data.forEach((data) => {
    divFilterColorList.innerHTML += `
        <button onclick="addColorFilter(${data.id}, event)" class="button-tag ${data.code}"></button>
      `;
  });
}

async function LoadProductSizes() {
  const data = await GetAllSizes();
  console.log(data);
  const divFilterSizeList = document.getElementById("divFilterSizeList");
  if (!divFilterSizeList) return;
  data.data.forEach((data) => {
    divFilterSizeList.innerHTML += `
        <button class="button-tag" onclick="addSizeFilter(${data.id}, event)">${data.name}</button>
      `;
  });
}

async function LoadProductTypes() {
  const data = await GetAllTypes();
  console.log(data);
  const divFilterTypeList = document.getElementById("divFilterTypeList");
  if (!divFilterTypeList) return;
  data.data.forEach((data) => {
    divFilterTypeList.innerHTML += `
        <button class="button-tag" onclick="addTypeFilter(${data.id}, event)">${data.name}</button>
      `;
  });
}

async function LoadProductGenders() {
  const data = await GetAllGenders();
  console.log(data);
  const divFilterGenderList = document.getElementById("divFilterGenderList");
  if (!divFilterGenderList) return;
  data.data.forEach((data) => {
    divFilterGenderList.innerHTML += `
        <button class="button-tag" onclick="addGenderFilter(${data.id}, event)">${data.name}</button>
      `;
  });
}
