<?php
session_start();
$allowed_roles = [1];
if (!isset($_SESSION['user']) || !in_array($_SESSION['role'], $allowed_roles)) {
  header('Location: ../pages/auth.php?login');
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin - Velvet Vogue</title>
  <link rel="stylesheet" href="../css/root.css" />
  <link rel="stylesheet" href="../css/animation.css" />
  <link rel="stylesheet" href="../css/admin-nav.css" />
  <link rel="stylesheet" href="../css/stock.css" />
  <link rel="stylesheet" href="../css/table.css" />
  <link rel="stylesheet" href="../css/loading.css" />
  <link rel="stylesheet" href="../css/filter.css" />
  <link rel="stylesheet" href="../css/pagination.css" />
  <script src="https://kit.fontawesome.com/01f74f74c3.js" crossorigin="anonymous"></script>
</head>

<body>
  <div id="divLoading">
    <div class="loader"></div>
  </div>
  <div class="stock-item-activity"></div>
  <div class="stock-container">
    <div class="stock">
      <div class="title">
        <div>
          <h3>Stock Management</h3>
          <p>Add or edit stock items</p>
        </div>
        <div class="activity">
          <div class="card">
            <div class="content">
              <p class="title">
                <i class="fa-solid fa-clock-rotate-left"></i> Activity
              </p>
              <div class="hidden-content">
                <p id="pHiddenText">
                  Select an item to view activity history
                </p>
                <p id="pAddedText">
                  Added by Heshan Deshapriya on 2024 01 01 10:90:01
                </p>
                <p id="pModifiedText">
                  Modified by Heshan Deshapriya on 2024 01 01 10:90:01
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="content-container">
        <form id="frmItemSubmit">
          <input type="hidden" name="id" id="inputStockID" />

          <label for="name ">Name</label>
          <input type="text" name="name" id="name" />

          <label for="product">Product</label>
          <select name="product" id="selectProductList" required>
            <!-- data -->
          </select>

          <label for="type">Type</label>
          <select name="type" id="selectTypeList" required>
            <!-- data -->
          </select>

          <label for="gender">Gender</label>
          <select name="gender" id="selectGenderList" required>
            <!-- data -->
          </select>

          <label for="color">Color</label>
          <select name="color" id="selectColorList" required>
            <!-- data -->
          </select>

          <label for="size">Size</label>
          <select name="size" id="selectSizeList" required>
            <!-- data -->
          </select>

          <label for="qty">Qty</label>
          <input type="number" name="qty" id="qty" required />

          <label for="price">Price</label>
          <input type="number" name="price" id="price" step="0.01" required />

          <label for="discount">Discount</label>
          <input type="number" name="discount" id="discount" step="0.01" required />

          <label for="cover">Cover Image</label>
          <input type="file" id="fileInputCoverImage" style="display: none" accept="image/*" />
          <label for="fileInputCoverImage" class="choose-image-button" id="cover"><i class="fa-regular fa-image"></i>
            Choose</label>
          <div class="selected-cover cover-image-hide" id="divSelectedCoverImage">
            <button type="button" id="btnRemoveCoverImage" class="remove-image" onclick="RemoveCoverImage()">
              Remove
            </button>
            <img id="imgSelectedCoverImage" src="../images/banner/image1.jpg" alt="" />
          </div>

          <label for="cover">Other Images</label>
          <input type="file" id="fileInputOtherImage" style="display: none" accept="image/*" multiple />
          <label for="fileInputOtherImage" class="choose-image-button" id="cover"><i class="fa-regular fa-images"></i>
            Choose</label>
          <div class="other-images" id="divOtherImages">
            <!-- other images -->
          </div>
          <div class="actions">
            <button type="submit" class="edit" id="btnSubmitItem">Add</button>
            <button type="button" class="clear" onclick="ClearFormData()">
              Clear
            </button>
          </div>
        </form>
        <div class="content">
          <div class="search">
            <select name="row-count" id="selectRowCount" onchange="ChangeRowCount()">
              <option value="12">12</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <input type="text" placeholder="Search Stock" id="inputSearch" oninput="SearchStocks()" />
            <button id="btnOpenFilterBox" onclick="OpenFilterBox()">
              <div id="divFilterStatusOn" class="dot"></div>
              <i class="fa-solid fa-bars-progress"></i>
            </button>
            <button id="btnClearFilters" onclick="ClearFilters()">
              Clear
            </button>
          </div>
          <table>
            <thead>
              <th>#</th>
              <th>Cover</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
              <th></th>
            </thead>
            <tbody id="tableStocks">
              <!-- <tr>
                  <td class="table-number">1</td>
                  <td>
                    <div class="table-image">
                      <img src="../images/about/image1.jpg" alt="" />
                    </div>
                  </td>
                  <td>T shirt Black XL Cotton Male</td>
                  <td>2000</td>
                  <td>LKR 3000.00</td>
                  <td>LKR -100.00</td>
                </tr> -->
            </tbody>
          </table>
        </div>
      </div>
      <div id="pagination"></div>
    </div>
  </div>
  <div id="adminNav"></div>
  <div id="filter"></div>
  <script src="../components/admin-nav/admin-nav.js"></script>
  <script src="../components/filter/filter.js" type="module"></script>
  <script src="../components/pagination/pagination.js"></script>
  <script src="../script/dark-mode.js"></script>
  <script src="../script/loading.js"></script>
  <script src="../script/stock.js" type="module"></script>
</body>

</html>