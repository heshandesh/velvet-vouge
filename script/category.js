import { GetAllCategories } from "../data/services/category.js";
import { GetProductBySubCategoryId } from "../data/services/product.js";
import {
  GetAllSubCategories,
  GetSubCategoriesByMainCategoryID,
} from "../data/services/sub-category.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sub = urlParams.get("sub");
  const pro = urlParams.get("pro");
  LoadMainCategoryList();
  if (sub) LoadSubCategoryList(sub);
  if (pro) LoadProductCategoryList(pro);
});

async function LoadMainCategoryList() {
  Loading(true);
  const data = await GetAllCategories();
  console.log("hello: ", data);
  const divCategoryMainCategoryList = document.getElementById(
    "divCategoryMainCategoryList"
  );
  if (!divCategoryMainCategoryList) return;
  data.data.forEach((data) => {
    divCategoryMainCategoryList.innerHTML += `
          <div class="item" onclick="location.href='sub-category.php?sub=${data.id}'">
            <div class="image">
              <img src="../images/main-category/${data.id}.jpg" alt="image" />
            </div>
            <h3>${data.name}</h3>
          </div>
        `;
  });
  Loading(false);
}

async function LoadSubCategoryList(id) {
  Loading(true);
  const data = await GetSubCategoriesByMainCategoryID(id);
  const divCategorySubCategoryList = document.getElementById(
    "divCategorySubCategoryList"
  );
  if (!divCategorySubCategoryList) return;
  data.data.forEach((data) => {
    divCategorySubCategoryList.innerHTML += `
            <div class="item" onclick="location.href='product-category.php?pro=${data.id}'">
              <div class="image">
                <img src="../images/sub-category/${data.id}.jpg" alt="image" />
              </div>
              <h3>${data.name}</h3>
            </div>
          `;
  });
  document.getElementById("divMainCategoryName").textContent =
    data.data[0].category_name;
  Loading(false);
}

async function LoadProductCategoryList(id) {
  Loading(true);
  const data = await GetProductBySubCategoryId(id);
  if (data.data.length == 0) {
    Loading(false);
    return;
  }
  console.log("hii", data);
  const divCategoryProductCategoryList = document.getElementById(
    "divCategoryProductCategoryList"
  );
  if (!divCategoryProductCategoryList) return;
  data.data.forEach((data) => {
    divCategoryProductCategoryList.innerHTML += `
            <div class="item" onclick="location.href='shop.php?id=${data.id}'">
              <div class="image">
                <img src="../images/product-category/${data.id}.jpg" alt="image" />
              </div>
              <h3>${data.name}</h3>
            </div>
          `;
  });
  document.getElementById("divSubCategoryName").textContent =
    data.data[0].category_name;
  Loading(false);
}
