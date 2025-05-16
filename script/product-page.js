import { GetStockById, GetStockIdByFilters } from "../data/services/stock.js";
import { GetAllColors, GetAllColorsByIds } from "../data/services/color.js";
import { GetAllSizes, GetAllSizesByIds } from "../data/services/size.js";
import { GetAllTypes, GetAllTypesByIds } from "../data/services/type.js";
import { GetAllGenders, GetAllGendersByIds } from "../data/services/gender.js";
import { GetAllFiltersByProductID } from "../data/services/filter.js";
import { InsertCartDetails } from "../data/services/cart.js";
import { GetRatingsByStockID } from "../data/services/rating.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const stockID = urlParams.get("id");
  LoadProduct(stockID);
});

let currentStock;
let maxItems;
let minItems = 1;
let selectedItemCount;
let selectedColor;
let selectedSize;
let selectedType;
let selectedGender;
let currentProductId;
let currentUserId = 1;

async function LoadProduct(id) {
  currentStock = await GetStockById(id);
  const data = currentStock;
  console.log("my data: ", data);
  document.getElementById("h3ProductTitle").textContent =
    data.data[0].display_name;
  document.getElementById("pProductPrice").textContent =
    "LKR " + data.data[0].new_price;
  document.getElementById("imgProductCover").src =
    "../images/product/cover/" + data.data[0].cover;
  document.getElementById("pProductOldPrice").textContent =
    "LKR " + data.data[0].price;
  if (data.data[0].discount != 0) {
    document.getElementById("pProductOldPrice").style.display = "block";
  } else {
    document.getElementById("pProductOldPrice").style.display = "none";
  }
  const divOtherImages = document.getElementById("divOtherImages");
  if (!divOtherImages) return;
  divOtherImages.innerHTML = "";
  divOtherImages.innerHTML += `
        <div class="other-image other-image-card" onclick="SetToMainImage('cover/${data.data[0].cover}')">
            <img src="../images/product/cover/${data.data[0].cover}" alt="" />
        </div>
    `;
  data.data.forEach((data) => {
    divOtherImages.innerHTML += `
            <div class="other-image other-image-card" onclick="SetToMainImage('other/${data.image_url}')">
                <img src="../images/product/other/${data.image_url}" alt="" />
            </div>
        `;
  });

  maxItems = data.data[0].qty;
  selectedColor = data.data[0].color_id;
  selectedSize = data.data[0].size_id;
  selectedType = data.data[0].type_id;
  selectedGender = data.data[0].gender_id;
  currentProductId = data.data[0].product_id;

  if (data.data[0].qty == 0) {
    selectedItemCount = 0;
    document.getElementById("divStockStatus").textContent = "Out Stock";
    document.getElementById("divStockStatus").classList.add("out-stock");
    document.getElementById("divStockStatus").classList.remove("in-stock");
    document.getElementById("divStockStatus").classList.remove("low-stock");
  } else if (data.data[0].qty > 10) {
    selectedItemCount = 1;
    document.getElementById("divStockStatus").textContent = "In Stock";
    document.getElementById("divStockStatus").classList.remove("out-stock");
    document.getElementById("divStockStatus").classList.add("in-stock");
    document.getElementById("divStockStatus").classList.remove("low-stock");
  } else {
    selectedItemCount = 1;
    document.getElementById(
      "divStockStatus"
    ).textContent = `Only ${data.data[0].qty} items left in stock`;
    document.getElementById("divStockStatus").classList.remove("out-stock");
    document.getElementById("divStockStatus").classList.remove("in-stock");
    document.getElementById("divStockStatus").classList.add("low-stock");
  }

  document.getElementById("spanItemCount").textContent = selectedItemCount;
  SetOtherImageClassEvents();
  LoadAllFiltersByProduct(data.data[0].product_id);
  LoadRatings();
}

window.SetToMainImage = function (url) {
  document.getElementById("imgProductCover").src = "../images/product/" + url;
};

window.UpdateItemQty = function (count) {
  if (count < 0) {
    if (selectedItemCount > minItems) {
      selectedItemCount += count;
    }
  } else {
    if (selectedItemCount < maxItems) {
      selectedItemCount += count;
    }
  }
  document.getElementById("spanItemCount").textContent = selectedItemCount;
};

function SetOtherImageClassEvents() {
  const items = document.querySelectorAll(".other-image-card");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((el) => el.classList.remove("clicked"));
      item.classList.add("clicked");
    });
  });
}

async function LoadAllFiltersByProduct(id) {
  const data = await GetAllFiltersByProductID(id);
  console.log("Filters: ", data);
  const colors = await GetAllColorsByIds(data.data.color_ids);
  const sizes = await GetAllSizesByIds(data.data.size_ids);
  const types = await GetAllTypesByIds(data.data.type_ids);
  const genders = await GetAllGendersByIds(data.data.gender_ids);
  await LoadProductColors(colors);
  await LoadProductSizes(sizes);
  await LoadProductTypes(types);
  await LoadProductGenders(genders);
}

async function LoadProductColors(data) {
  const divProductColorList = document.getElementById("divProductColorList");
  if (!divProductColorList) return;
  divProductColorList.innerHTML = "";
  data.data.forEach((data) => {
    divProductColorList.innerHTML += `
        <button onclick="SelectColor(${data.id})" class="${data.code} color-tag" id="color-tag-${data.id}"></button>
      `;
  });
  setColorEvents();
}

function setColorEvents() {
  const items = document.querySelectorAll(".color-tag");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
  const activeTag = document.getElementById(
    `color-tag-${currentStock.data[0].color_id}`
  );
  activeTag.classList.add("active");
}

async function LoadProductSizes(data) {
  const divProductSizeList = document.getElementById("divProductSizeList");
  if (!divProductSizeList) return;
  divProductSizeList.innerHTML = "";
  data.data.forEach((data) => {
    divProductSizeList.innerHTML += `
        <button onclick="SelectSize(${data.id})" class="size-tag"  id="size-tag-${data.id}">${data.name}</button>
      `;
  });
  setSizeEvents();
}

function setSizeEvents() {
  const items = document.querySelectorAll(".size-tag");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
  const activeTag = document.getElementById(
    `size-tag-${currentStock.data[0].size_id}`
  );
  activeTag.classList.add("active");
}

async function LoadProductTypes(data) {
  const divProductTypeList = document.getElementById("divProductTypeList");
  if (!divProductTypeList) return;
  divProductTypeList.innerHTML = "";
  data.data.forEach((data) => {
    divProductTypeList.innerHTML += `
        <button onclick="SelectType(${data.id})" class="type-tag" id="type-tag-${data.id}">${data.name}</button>
      `;
  });
  setTypeEvents();
}

function setTypeEvents() {
  const items = document.querySelectorAll(".type-tag");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
  const activeTag = document.getElementById(
    `type-tag-${currentStock.data[0].type_id}`
  );
  activeTag.classList.add("active");
}

async function LoadProductGenders(data) {
  const divProductGenderList = document.getElementById("divProductGenderList");
  if (!divProductGenderList) return;
  divProductGenderList.innerHTML = "";
  data.data.forEach((data) => {
    divProductGenderList.innerHTML += `
        <button onclick="SelectGender(${data.id})" class="gender-tag" id="gender-tag-${data.id}">${data.name}</button>
      `;
  });
  setGenderEvents();
}

function setGenderEvents() {
  const items = document.querySelectorAll(".gender-tag");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
  const activeTag = document.getElementById(
    `gender-tag-${currentStock.data[0].gender_id}`
  );
  activeTag.classList.add("active");
}

window.SelectColor = function (id) {
  selectedColor = id;
  GetStockIdFromFilters();
};

window.SelectSize = function (id) {
  selectedSize = id;
  GetStockIdFromFilters();
};

window.SelectType = function (id) {
  selectedType = id;
  GetStockIdFromFilters();
};

window.SelectGender = function (id) {
  selectedGender = id;
  GetStockIdFromFilters();
};

async function GetStockIdFromFilters() {
  const filters = {
    color: selectedColor,
    size: selectedSize,
    type: selectedType,
    gender: selectedGender,
    product: currentProductId,
  };
  const result = await GetStockIdByFilters(filters);
  await LoadProduct(result.data.id);
}

window.AddItemToCart = async function () {
  if (selectedItemCount == 0) return;
  const data = {
    stock_id: currentStock.data[0].id,
    user_id: currentUserId,
    qty: selectedItemCount,
  };
  const response = await InsertCartDetails(data);
  if (!response.success) {
    if (response.message == "not-logged-in") {
      window.location = "auth.php?login";
      return;
    }
    alert(response.message);
    return;
  }
  await loadCartDetails();
  ToggleCart();
};

async function LoadRatings() {
  const data = await GetRatingsByStockID(currentStock.data[0].id);
  console.log(data);
  document.querySelectorAll(".rating-star-main").forEach((star, index) => {
    if (
      index + 1 <=
      parseFloat(data.data.length != 0 ? data.data[0].value : 0).toFixed(1)
    ) {
      if (!star.classList.contains("active-star")) {
        star.classList.add("active-star");
      }
    } else {
      if (star.classList.contains("active-star")) {
        star.classList.remove("active-star");
      }
    }
  });
  document.getElementById("h3RatingValue").textContent =
    data.data.length != 0 ? data.data[0].value : "0.0";
  document.getElementById("pRatingCount").textContent =
    data.data.length != 0
      ? "Based on " + data.data.length + " user reviews"
      : "No reviews for this product yet";
  data.data.forEach((data) => {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= data.user_value) {
        stars += '<i class="active fa-solid fa-star"></i>';
      } else {
        stars += '<i class="fa-solid fa-star"></i>'; // Empty star for remaining rating
      }
    }
    document.getElementById("ratingPosts").innerHTML += `
        <hr />
        <div class="review-card">
          <div class="profile">
            <div class="icon">
              <img src="../images/user/${data.user_avatar}" alt="" />
            </div>
            <div class="content">
              <p class="name">${data.user_name}</p>
              <div class="stars">
                ${stars} 
              </div>
              <p class="date">${data.submit_date}</p>
            </div>
          </div>
          <div class="content">
            <p>${data.user_message}</p>
          </div>
        </div>
        `;
  });
}
