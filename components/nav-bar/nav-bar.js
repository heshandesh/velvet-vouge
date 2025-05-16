import { GetUserByID } from "../../data/services/auth.js";
import { GetAllStocks } from "../../data/services/stock.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/nav-bar/nav-bar.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navBar").innerHTML = data;
    })
    .then(LoadUserDetails())
    .catch((error) => console.error("Error fetching content:", error));
});

window.SearchStockFromNav = async function () {
  const searchName = document.getElementById("inputSearchStockNav").value;
  const stockParams = {
    startRow: 0,
    pageSize: 5,
    type_ids: "",
    gender_ids: "",
    color_ids: "",
    size_ids: "",
    search_name: searchName,
    price_start: 0,
    price_end: 10000,
    product_id: 0,
  };
  const data = await GetAllStocks(stockParams);
  const divNavSearchResults = document.getElementById("divNavSearchResults");
  if (data.data.length == 0 || searchName == "" || searchName == null) {
    document.getElementById("divNavNoSearchItems").style.display = "block";
    divNavSearchResults.innerHTML = "";
    return;
  } else {
    document.getElementById("divNavNoSearchItems").style.display = "none";
  }
  divNavSearchResults.innerHTML = "";
  data.data.forEach((data) => {
    divNavSearchResults.innerHTML += `
        <div class="result-card" onclick="location.href='product.php?id=${data.id}'">
          <div class="image">
            <img src="../images/product/cover/${data.cover}" alt="">
          </div>
          <div class="content">
            <p class="title">${data.display_name}</p>
            <p class="price">${data.price}</p>
          </div>
        </div>
        <hr>
        `;
  });
};

async function LoadUserDetails() {
  const data = await GetUserByID();
  document.getElementById("dUserName").textContent = data.data.name;
  document.getElementById("dUserEmail").textContent = data.data.email;
  document.getElementById("dUserAddress").innerHTML =
    data.data.address_line_1 +
    "<br />" +
    data.data.address_line_2 +
    "<br />" +
    data.data.address_line_3 +
    "<br />" +
    data.data.city;
  document.getElementById("dUserPhone").textContent = data.phone;
}
