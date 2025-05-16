import { GetAllStocks, GetTotalStockCount } from "../data/services/stock.js";

let typeIdsArray = [];
let genderIdsArray = [];
let colorIdsArray = [];
let sizeIdsArray = [];
let priceStart = 0;
let priceEnd = 10000;
let startRowNumber = 0;
let pageSizeNumber = 9;
let totalPagesCount;
let currentPageNumber = 1;
let totalResultCount;
let thisProductID;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    thisProductID = id;
  } else {
    thisProductID = 0;
  }
  setTimeout(() => {
    LoadAllStocks();
  }, 500);
});

window.addTypeFilter = function (id, event) {
  event.target.classList.toggle("active");
  const typeIdsSet = new Set(typeIdsArray);
  typeIdsSet.has(id) ? typeIdsSet.delete(id) : typeIdsSet.add(id);
  typeIdsArray = [...typeIdsSet];
  LoadAllStocks();
};
window.addGenderFilter = function (id, event) {
  event.target.classList.toggle("active");
  const genderIdsSet = new Set(genderIdsArray);
  genderIdsSet.has(id) ? genderIdsSet.delete(id) : genderIdsSet.add(id);
  genderIdsArray = [...genderIdsSet];
  LoadAllStocks();
};
window.addColorFilter = function (id, event) {
  event.target.classList.toggle("active");
  const colorIdSet = new Set(colorIdsArray);
  colorIdSet.has(id) ? colorIdSet.delete(id) : colorIdSet.add(id);
  colorIdsArray = [...colorIdSet];
  LoadAllStocks();
};
window.addSizeFilter = function (id, event) {
  event.target.classList.toggle("active");
  const sizeIdSet = new Set(sizeIdsArray);
  sizeIdSet.has(id) ? sizeIdSet.delete(id) : sizeIdSet.add(id);
  sizeIdsArray = [...sizeIdSet];
  LoadAllStocks();
};

async function LoadAllStocks() {
  let type_ids = typeIdsArray.join(",");
  let gender_ids = genderIdsArray.join(",");
  let color_ids = colorIdsArray.join(",");
  let size_ids = sizeIdsArray.join(",");

  const stockParams = {
    startRow: startRowNumber,
    pageSize: pageSizeNumber,
    type_ids: type_ids,
    gender_ids: gender_ids,
    color_ids: color_ids,
    size_ids: size_ids,
    search_name: "",
    price_start: priceStart,
    price_end: priceEnd,
    product_id: thisProductID, //all
  };
  const { startRow, pageSize, ...filteredParams } = stockParams;
  const data = await GetAllStocks({ ...filteredParams, startRow, pageSize });
  const count = await GetTotalStockCount({ ...filteredParams });
  totalResultCount = count.data[0].total_count;
  totalPagesCount = Math.ceil(totalResultCount / pageSizeNumber);
  document.getElementById("spanTotalPageCount").textContent =
    "/" + totalPagesCount;
  document.getElementById("btnLastPageNumber").textContent = totalPagesCount;
  document.getElementById("inputJumpPageNumber").value = currentPageNumber;
  document.getElementById("inputJumpPageNumber").max = totalPagesCount;
  const divShopProductList = document.getElementById("divShopProductList");
  if (!divShopProductList) return;
  if (data.data.length == 0) {
    divShopProductList.innerHTML = "No Results";
    document.getElementById("divNoResults").style.display = "flex";
    document.getElementById("divPagination").style.display = "none";
    return;
  } else {
    document.getElementById("divNoResults").style.display = "none";
    document.getElementById("divPagination").style.display = "flex";
  }
  CreatePageButtons();
  if (currentPageNumber == 1) {
    document.getElementById("btnFirstPage").classList.add("active");
    btnPrevPage.style.display = "none";
  } else {
    document.getElementById("btnFirstPage").classList.remove("active");
    btnPrevPage.style.display = "block";
  }
  if (currentPageNumber == totalPagesCount) {
    document.getElementById("btnLastPageNumber").classList.add("active");
    btnNextPage.style.display = "none";
  } else {
    document.getElementById("btnLastPageNumber").classList.remove("active");
    btnNextPage.style.display = "block";
  }
  if (totalPagesCount == 1) {
    document.getElementById("btnLastPageNumber").style.display = "none";
    document.getElementById("btnJumpByPageNumberInput").style.display = "none";
  } else {
    document.getElementById("btnLastPageNumber").style.display = "block";
    document.getElementById("btnJumpByPageNumberInput").style.display = "block";
  }
  if (totalResultCount == 0) {
    document.getElementById("divNoResults").style.display = "flex";
    document.getElementById("divPagination").style.display = "none";
  } else {
    document.getElementById("divNoResults").style.display = "none";
    document.getElementById("divPagination").style.display = "flex";
  }
  divShopProductList.innerHTML = "";
  data.data.forEach((data) => {
    let itemHTML = "";

    itemHTML += `
        <div class="item" onclick="location.href='product.php?id=${data.id}'">
    `;

    if (data.discount > 0) {
      itemHTML += `
            <div class="label discounts">${data.perc_discount}% Off</div>
        `;
    }

    itemHTML += `
        <div class="image">
        <img src="../images/product/cover/${data.cover}" alt="image" />
        </div>
        <h3>${data.display_name}</h3>
        <p>LKR ${data.price}</p>
    `;

    if (data.qty > 10) {
      itemHTML += `
            <div class="stock-status in-stock">In Stock</div>
        `;
    } else if (data.qty > 0) {
      itemHTML += `
            <div class="stock-status low-stock">Low Stock</div>
        `;
    } else {
      itemHTML += `
            <div class="stock-status out-stock">Out Stock</div>
        `;
    }

    itemHTML += `
        </div>
    `;

    divShopProductList.innerHTML += itemHTML;
  });
}

function CreatePageButtons() {
  let u = currentPageNumber - 2;
  let lastU = currentPageNumber + 2;
  const pagesDiv = document.getElementById("divPageButtonContainer");
  pagesDiv.innerHTML = "";
  let btnIndex = 0;
  for (u; u <= lastU; u++) {
    btnIndex++;
    if (u <= totalPagesCount - 1 && u != 0) {
      // console.log("Pages: " + u);
      // if (u < 0) return;
      if (btnIndex == 1 && currentPageNumber != 1) {
        pagesDiv.innerHTML += `
            <button class="page-jump-button-${btnIndex} page-jump-number-button-${u}" onclick="JumpPageByNumber(${u})"><i class="fa-solid fa-ellipsis"></i></button>
          `;
      } else if (btnIndex == 3) {
        pagesDiv.innerHTML += `
            <button class="page-jump-button-${btnIndex} page-jump-number-button-${u} active" onclick="JumpPageByNumber(${u})">${u}</button>
          `;
      } else if (btnIndex == 5) {
        pagesDiv.innerHTML += `
            <button class="page-jump-button-${btnIndex} page-jump-number-button-${u}" onclick="JumpPageByNumber(${u})"><i class="fa-solid fa-ellipsis"></i></button>
          `;
      } else if (btnIndex < 6) {
        pagesDiv.innerHTML += `
            <button class="page-jump-button-${btnIndex} page-jump-number-button-${u}" onclick="JumpPageByNumber(${u})">${u}</button>
          `;
      }
    }
  }
  const minesBtn = document.querySelector(".page-jump-number-button--1");
  const firstBtn = document.querySelector(".page-jump-number-button-1");
  if (minesBtn) {
    minesBtn.style.display = "none";
  }
  if (firstBtn) {
    firstBtn.style.display = "none";
  }
}

window.InputStartPrice = function (event) {
  priceStart = event.target.value;
  LoadAllStocks();
};

window.InputEndPrice = function (event) {
  priceEnd = event.target.value;
  LoadAllStocks();
};

window.ChangePriceSlider = function () {
  priceStart = document.getElementById("priceInputMin").value;
  priceEnd = document.getElementById("priceInputMax").value;
  LoadAllStocks();
};

window.ChangeRowCount = function () {
  pageSizeNumber = document.getElementById("selectRowCount").value;
  LoadAllStocks();
};

window.JumpPage = function () {
  const inputJumpPageNumber = document.getElementById(
    "inputJumpPageNumber"
  ).value;

  let num = (inputJumpPageNumber - 1) * pageSizeNumber;

  if (num == null || num == "") {
    startRowNumber = 0;
  } else {
    startRowNumber = num;
  }
  currentPageNumber = inputJumpPageNumber;
  LoadAllStocks();
};

window.JumpPageByNumber = function (inputJumpPageNumber) {
  let num = (inputJumpPageNumber - 1) * pageSizeNumber;
  if (num == null || num == "") {
    startRowNumber = 0;
  } else {
    startRowNumber = num;
  }
  currentPageNumber = inputJumpPageNumber;
  LoadAllStocks();
};

window.JumpNextPage = function () {
  currentPageNumber = +currentPageNumber;
  if (currentPageNumber == totalPagesCount) return;

  let inputJumpPageNumber = currentPageNumber + 1;
  let num = (inputJumpPageNumber - 1) * pageSizeNumber;
  if (num == null || num == "") {
    startRowNumber = 0;
  } else {
    startRowNumber = num;
  }
  currentPageNumber = inputJumpPageNumber;
  LoadAllStocks();
};

window.JumpPrevPage = function () {
  currentPageNumber = +currentPageNumber;
  if (currentPageNumber == 1) return;
  let inputJumpPageNumber = currentPageNumber - 1;
  let num = (inputJumpPageNumber - 1) * pageSizeNumber;
  if (num == null || num == "") {
    startRowNumber = 0;
  } else {
    startRowNumber = num;
  }
  currentPageNumber = inputJumpPageNumber;
  LoadAllStocks();
};

window.JumpLastPage = function () {
  let num = (totalPagesCount - 1) * pageSizeNumber;
  if (num == null || num == "") {
    startRowNumber = 0;
  } else {
    startRowNumber = num;
  }
  currentPageNumber = totalPagesCount;
  LoadAllStocks();
};
