<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Velvet Vogue</title>
    <link rel="stylesheet" href="../css/root.css" />
    <link rel="stylesheet" href="../css/animation.css" />
    <link rel="stylesheet" href="../css/nav-bar.css" />
    <link rel="stylesheet" href="../css/footer.css" />
    <link rel="stylesheet" href="../css/cart.css" />
    <link rel="stylesheet" href="../css/product-grid.css" />
    <link rel="stylesheet" href="../css/category.css" />
    <link rel="stylesheet" href="../css/loading.css" />
    <script
      src="https://kit.fontawesome.com/01f74f74c3.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <div class="product-grid-container">
      <div class="grid-title">Categories</div>
      <div class="product-grid" id="divCategoryMainCategoryList">
        <!-- <div class="item">
          <div class="image">
            <img src="../images/about/image1.jpg" alt="image" />
          </div>
          <h3>Casual Wear</h3>
        </div> -->
      </div>
    </div>
    <div id="cart"></div>
    <div id="navBar"></div>
    <div id="footer"></div>
    <div id="divLoading">
      <div class="loader"></div>
    </div>
    <script src="../script/loading.js"></script>
    <script src="../components/nav-bar/nav-bar.js" type="module"></script>
    <script src="../components/footer/footer.js" type="module"></script>
    <script src="../components/cart/cart.js" type="module"></script>
    <script src="../script/dark-mode.js"></script>
    <script src="../script/user-panel.js"></script>
    <script src="../script/cart.js"></script>
    <script src="../script/search.js"></script>
    <script src="../script/nav-bar-overlay.js"></script>
    <script src="../script/category.js" type="module"></script>
  </body>
</html>
