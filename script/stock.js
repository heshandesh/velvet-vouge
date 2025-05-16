import { GetAllColors } from "../data/services/color.js";
import { GetAllGenders } from "../data/services/gender.js";
import { GetAllProducts } from "../data/services/product.js";
import { GetAllSizes } from "../data/services/size.js";
import {
  DeleteStock,
  GetAllStocks,
  GetStockById,
  GetTotalStockCount,
  InsertStock,
} from "../data/services/stock.js";
import { GetAllTypes } from "../data/services/type.js";

const fileInputCoverImage = document.getElementById("fileInputCoverImage");
const fileInputOtherImage = document.getElementById("fileInputOtherImage");
const imgSelectedCoverImage = document.getElementById("imgSelectedCoverImage");
const divSelectedCoverImage = document.getElementById("divSelectedCoverImage");
const divOtherImages = document.getElementById("divOtherImages");
const frmItemSubmit = document.getElementById("frmItemSubmit");
const btnSubmitItem = document.getElementById("btnSubmitItem");

let coverImageFile;
let imageUrls = [];
let selectedFiles = [];
let formEditMode;
let coverImagesSentencedToDelete = [];
let otherImagesSentencedToDelete = [];
let currentUserID; //No need
let typeIdsArray = [];
let genderIdsArray = [];
let colorIdsArray = [];
let sizeIdsArray = [];
let priceStart = 0;
let priceEnd = 10000;
let startRowNumber = 0;
let pageSizeNumber = 1;
let totalPagesCount;
let currentPageNumber = 1;
let totalResultCount;

document.addEventListener("DOMContentLoaded", () => {
  FormEditMode(false);
  setTimeout(() => {
    LoadAllStocks();
  }, 500);
  LoadProductList();
  LoadTypeList();
  LoadGenderList();
  LoadColorList();
  LoadSizeList();
  currentUserID = 1; //temp
});

document.addEventListener("click", function (event) {
  const filter = document.getElementById("filter");
  const btnOpenFilterBox = document.getElementById("btnOpenFilterBox");
  if (
    !filter.contains(event.target) &&
    !btnOpenFilterBox.contains(event.target)
  ) {
    CloseFilterBox();
  }
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

window.ClearFilters = function () {
  const rangeInput = document.querySelectorAll(".range-input input");
  const range = document.querySelector(".slider .progress");
  range.style.left = 0;
  range.style.right = 0;
  rangeInput.forEach(() => {
    rangeInput[0].value = 0;
    rangeInput[1].value = 10000;
  });
  typeIdsArray = [];
  genderIdsArray = [];
  colorIdsArray = [];
  sizeIdsArray = [];
  priceStart = 0;
  priceEnd = 10000;
  document.getElementById("priceInputMin").value = 0;
  document.getElementById("priceInputMax").value = 10000;
  const elements = document.querySelectorAll(".tags button");
  elements.forEach((element) => {
    element.classList.remove("active");
  });
  LoadAllStocks();
};

function FormEditMode(mode) {
  formEditMode = mode;
  if (mode) {
    btnSubmitItem.classList.add("edit");
    btnSubmitItem.textContent = "Edit";
  } else {
    btnSubmitItem.classList.remove("edit");
    btnSubmitItem.textContent = "Add";
  }
}

window.LoadStockByID = async function (id) {
  ClearFormData();
  FormEditMode(true);
  const data = await GetStockById(id);
  frmItemSubmit.elements["id"].value = data.data[0].id;
  frmItemSubmit.elements["name"].value = data.data[0].name;
  frmItemSubmit.elements["product"].value = data.data[0].product_id;
  frmItemSubmit.elements["type"].value = data.data[0].type_id;
  frmItemSubmit.elements["gender"].value = data.data[0].gender_id;
  frmItemSubmit.elements["color"].value = data.data[0].color_id;
  frmItemSubmit.elements["size"].value = data.data[0].size_id;
  frmItemSubmit.elements["qty"].value = data.data[0].qty;
  frmItemSubmit.elements["price"].value = data.data[0].price;
  frmItemSubmit.elements["discount"].value = data.data[0].discount;
  LoadEditCoverImage(data.data[0].cover);
  LoadEditOtherImages(data.data);
  SentenceOldOtherImagesToDelete(data.data);
  coverImagesSentencedToDelete.push(data.data[0].cover);
  document.getElementById("pHiddenText").style.display = "none";
  const pAddedText = document.getElementById("pAddedText");
  const pModifiedText = document.getElementById("pModifiedText");
  pAddedText.style.display = "block";
  pAddedText.textContent = `
    Added by ${data.data[0].added_user_name} on ${data.data[0].added_date}
  `;
  pModifiedText.style.display = "block";
  pModifiedText.textContent = `
    Modified by ${data.data[0].updated_user_name} on ${data.data[0].updated_date}
  `;
};

function SentenceOldOtherImagesToDelete(data) {
  data.forEach((item) => {
    otherImagesSentencedToDelete.push(item.image_url);
  });
}

function LoadEditCoverImage(name) {
  let url = "../images/product/cover/" + name;
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], name, { type: blob.type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const event = new Event("change", { bubbles: true });
      Object.defineProperty(event, "target", {
        writable: false,
        value: { files: dataTransfer.files },
      });
      ChooseCoverImage(event);
    })
    .catch((error) => console.error("Error fetching file:", error));
}

function LoadEditOtherImages(data) {
  let dataTransfer = new DataTransfer();
  let event = new Event("change", { bubbles: true });
  const fetchPromises = data.map((row) => {
    let url = "../images/product/other/" + row.image_url;
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], row.image_url, { type: blob.type });
        dataTransfer.items.add(file);
      })
      .catch((error) => console.error("Error fetching file:", error));
  });
  Promise.all(fetchPromises).then(() => {
    Object.defineProperty(event, "target", {
      writable: false,
      value: { files: dataTransfer.files },
    });
    ChooseOtherImages(event);
  });
}

window.SearchStocks = function () {
  LoadAllStocks();
};

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
  console.log(currentPageNumber);

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

function CreatePageButtons() {
  // console.log("Test Start");
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

async function LoadAllStocks() {
  let type_ids = typeIdsArray.join(",");
  let gender_ids = genderIdsArray.join(",");
  let color_ids = colorIdsArray.join(",");
  let size_ids = sizeIdsArray.join(",");

  const searchName = document.getElementById("inputSearch").value;

  const stockParams = {
    startRow: startRowNumber,
    pageSize: pageSizeNumber,
    type_ids: type_ids,
    gender_ids: gender_ids,
    color_ids: color_ids,
    size_ids: size_ids,
    search_name: searchName,
    price_start: priceStart,
    price_end: priceEnd,
    product_id: 0, //all
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
  const tableStocks = document.getElementById("tableStocks");
  if (!tableStocks) return;
  tableStocks.innerHTML = "";
  let index = startRowNumber - 1;
  console.log(startRowNumber);
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
  if (data.data.length == 0) {
    tableStocks.innerHTML += `
        <tr class="empty-row">
            <td colspan="7">No Results</td>
        </tr>
        `;
    return;
  }
  data.data.forEach((data) => {
    index++;
    tableStocks.innerHTML += `
        <tr onclick="LoadStockByID(${data.id})">
            <td class="table-number">${index + 1}</td>
            <td>
            <div class="table-image">
                <img src="../images/product/cover/${
                  data.cover || "not-found.jpg"
                }" alt="" />
            </div>
            </td>
            <td>${data.display_name}</td>
            <td>${data.qty}</td>
            <td>LKR ${data.price}</td>
            <td>LKR -${data.discount}</td>
            <td style="text-align:center;"><button class="table-row-delete" onclick="DeleteStockItem(event, ${
              data.id
            })"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
  });
  setTableRowDeleteButtonStyle();
}

function setTableRowDeleteButtonStyle() {
  const deleteButtons = document.querySelectorAll(".table-row-delete");
  deleteButtons.forEach((button) => {
    const parentRow = button.closest("tr");
    button.addEventListener("mouseenter", () => {
      parentRow.classList.add("select-row-delete");
    });
    button.addEventListener("mouseleave", () => {
      parentRow.classList.remove("select-row-delete");
    });
  });
}

window.DeleteStockItem = async function (event, id) {
  event.stopPropagation();
  const stock = await GetStockById(id);
  SentenceOldOtherImagesToDelete(stock.data);
  coverImagesSentencedToDelete.push(stock.data[0].cover);
  if (!confirm("Do you want to delete this item?")) {
    ClearFormData();
    return;
  }
  const data = await DeleteStock(id);
  if (!data.success) return;
  DeleteCoverImage();
  DeleteOtherImage();
  ClearFormData();
  LoadAllStocks();
};

async function LoadProductList() {
  const data = await GetAllProducts();
  const list = document.getElementById("selectProductList");
  if (!list) return;
  list.innerHTML = "<option value=''></option>";
  data.data.forEach((data) => {
    list.innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
  });
}

async function LoadTypeList() {
  const data = await GetAllTypes();
  const list = document.getElementById("selectTypeList");
  if (!list) return;
  list.innerHTML = "<option value=''></option>";
  data.data.forEach((data) => {
    list.innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
  });
}

async function LoadGenderList() {
  const data = await GetAllGenders();
  const list = document.getElementById("selectGenderList");
  if (!list) return;
  list.innerHTML = "<option value=''></option>";
  data.data.forEach((data) => {
    list.innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
  });
}

async function LoadColorList() {
  const data = await GetAllColors();
  const list = document.getElementById("selectColorList");
  if (!list) return;
  list.innerHTML = "<option value=''></option>";
  data.data.forEach((data) => {
    list.innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
  });
}

async function LoadSizeList() {
  const data = await GetAllSizes();
  const list = document.getElementById("selectSizeList");
  if (!list) return;
  list.innerHTML = "<option value=''></option>";
  data.data.forEach((data) => {
    list.innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
  });
}

fileInputCoverImage.addEventListener("change", ChooseCoverImage);
fileInputOtherImage.addEventListener("change", ChooseOtherImages);
frmItemSubmit.addEventListener("submit", SubmitItem);

function ChooseCoverImage(event) {
  const file = event.target.files[0];
  if (file) {
    const timestamp = new Date().getTime();
    const uniqueName = `${timestamp}${file.name.substring(
      file.name.lastIndexOf(".")
    )}`;
    coverImageFile = new File([file], uniqueName, { type: file.type });
    const imageUrl = URL.createObjectURL(coverImageFile);
    imgSelectedCoverImage.src = imageUrl;
    divSelectedCoverImage.style.display = "block";
  }
}

function ChooseOtherImages(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      const timestamp = new Date().getTime();
      const uniqueName = `${timestamp}${i}${file.name.substring(
        file.name.lastIndexOf(".")
      )}`;
      const renamedFile = new File([file], uniqueName, { type: file.type });
      const imageUrl = URL.createObjectURL(renamedFile);
      imageUrls.push(imageUrl);
      selectedFiles.push(renamedFile);
    }
  }
  UpdateOtherImagesUI();
}

function UpdateOtherImagesUI() {
  divOtherImages.innerHTML = "";
  imageUrls.forEach((url, index) => {
    divOtherImages.innerHTML += `
        <div class="selected-cover">
            <button
                type="button"
                class="remove-image"
                onclick="RemoveOtherImageFromArray(${index})"
            >
                Remove
            </button>
            <img
                id="imgSelectedCoverImage"
                src="${url}"
                alt=""
            />
        </div>
    `;
  });
}

function DeleteCoverImage() {
  let path = "../images/product/cover";
  DeleteProductImage(path, coverImagesSentencedToDelete);
  console.log(coverImagesSentencedToDelete);
}

function DeleteOtherImage() {
  let path = "../images/product/other";
  DeleteProductImage(path, otherImagesSentencedToDelete);
}

function DeleteProductImage(path, imagesToDelete) {
  fetch("../php/delete-product-image.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path: path, filenames: imagesToDelete }),
  })
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

async function SaveCoverImage() {
  if (coverImageFile == null) return;
  const formData = new FormData();
  formData.append("coverImage", coverImageFile);

  const uploadDir = "../images/product/cover/";
  formData.append("uploadDir", uploadDir);

  await fetch("../php/save-image.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

async function SaveOtherImages() {
  if (selectedFiles == null) return;
  const formData = new FormData();

  const uploadDir = "../images/product/other/";
  formData.append("uploadDir", uploadDir);

  selectedFiles.forEach((file, index) => {
    formData.append(`image_${index}`, file);
  });

  await fetch("../php/save-image.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

async function SubmitItem(event) {
  event.preventDefault();
  if (coverImageFile == null) {
    alert("Please choose a cover image");
    return;
  }
  const formData = new FormData(document.getElementById("frmItemSubmit"));
  const dataObject = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });
  dataObject.cover = coverImageFile.name;
  dataObject.other_images = selectedFiles.map((file) => file.name);
  dataObject.user_id = currentUserID;
  const response = await InsertStock(dataObject);
  if (!response.success) {
    if (response.message == "not-logged-in") {
      window.location = "../pages/auth.php?login";
      return;
    }
    alert(response.message);
    return;
  }
  alert(response.message);
  if (formEditMode) {
    DeleteCoverImage();
    DeleteOtherImage();
  }
  Loading(true);
  await SaveOtherImages();
  await SaveCoverImage();
  LoadAllStocks();
  ClearFormData();
  Loading(false);
}

window.RemoveCoverImage = function () {
  imgSelectedCoverImage.src = "";
  fileInputCoverImage.value = "";
  divSelectedCoverImage.style.display = "none";
};

window.RemoveOtherImageFromArray = function (index) {
  imageUrls.splice(index, 1);
  selectedFiles.splice(index, 1);
  UpdateOtherImagesUI();
};

window.ClearFormData = function () {
  FormEditMode(false);
  frmItemSubmit.reset();
  imageUrls = [];
  selectedFiles = [];
  coverImageFile = null;
  divOtherImages.innerHTML = "";
  divSelectedCoverImage.style.display = "none";
  coverImagesSentencedToDelete = [];
  otherImagesSentencedToDelete = [];
  frmItemSubmit.elements["id"].value = 0;
  document.getElementById("pHiddenText").style.display = "block";
  document.getElementById("pAddedText").style.display = "none";
  document.getElementById("pModifiedText").style.display = "none";
};

window.OpenFilterBox = function () {
  document.getElementById("filter").style.display = "block";
};

window.CloseFilterBox = function () {
  document.getElementById("filter").classList.add("filter-hide");
  setTimeout(() => {
    document.getElementById("filter").style.display = "none";
    document.getElementById("filter").classList.remove("filter-hide");
  }, 300);
  if (
    priceStart != 0 ||
    priceEnd != 10000 ||
    colorIdsArray.length != 0 ||
    genderIdsArray.length != 0 ||
    typeIdsArray.length != 0 ||
    sizeIdsArray.length != 0
  ) {
    document.getElementById("btnClearFilters").style.display = "block";
    document.getElementById("divFilterStatusOn").style.display = "block";
  } else {
    document.getElementById("divFilterStatusOn").style.display = "none";
    document.getElementById("btnClearFilters").style.display = "none";
  }
};
