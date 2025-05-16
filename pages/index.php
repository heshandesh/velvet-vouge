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
  <link rel="stylesheet" href="../css/product-scroll.css" />
  <link rel="stylesheet" href="../css/product-grid.css" />
  <link rel="stylesheet" href="../css/banner.css" />
  <script src="https://kit.fontawesome.com/01f74f74c3.js" crossorigin="anonymous"></script>
</head>

<body>
  <div class="banner-container">
    <div class="banner-images">
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
    </div>
    <div class="banner-content">
      <h3>Velvet Vogue</h3>
      <p>Where style meets every generation</p>
      <button onclick="location.href='main-category.php'">Shop Now</button>
    </div>
  </div>
  <div class="product-scroll-container">
    <div class="container-title">New Arrivals</div>
    <div class="product-scroll" id="divIndexNewArrivalList">
      <!-- <div class="item">
          <div class="label new-arrivals">New</div>
          <div class="image">
            <img src="../images/about/image1.jpg" alt="image" />
          </div>
          <h3>Comfort Fitr Crew Neck T-Shirt Black</h3>
          <p>LKR 990.00</p>
        </div> -->
    </div>
  </div>
  <div class="product-scroll-container">
    <div class="container-title">Promotions</div>
    <div class="product-scroll" id="divIndexPromotionList">
      <!-- <div class="item">
          <div class="label discounts">10% Off</div>
          <div class="image">
            <img src="../images/about/image1.jpg" alt="image" />
          </div>
          <h3>Comfort Fitr Crew Neck T-Shirt Black</h3>
          <p>LKR 990.00</p>
          <p><s>LKR 990.00</s></p>
        </div> -->
    </div>
  </div>
  <div class="product-grid-container">
    <div class="grid-title">Explore More</div>
    <div class="product-grid" id="divIndexProductList">
      <!-- <div class="item">
          <div class="image">
            <img src="../images/about/image1.jpg" alt="image" />
          </div>
          <h3>Comfort Fitr Crew Neck T-Shirt Black</h3>
          <p>LKR 990.00</p>
        </div> -->
    </div>
  </div>
  <div id="cart"></div>
  <div id="navBar"></div>
  <div id="footer"></div>
  <script src="../components/nav-bar/nav-bar.js" type="module"></script>
  <script src="../components/footer/footer.js" type="module"></script>
  <script src="../components/cart/cart.js" type="module"></script>
  <script src="../script/dark-mode.js"></script>
  <script src="../script/user-panel.js"></script>
  <script src="../script/cart.js"></script>
  <script src="../script/search.js"></script>
  <script src="../script/nav-bar-overlay.js"></script>
  <script src="../script/slide-show.js"></script>
  <script src="../script/product.js" type="module"></script>
</body>

</html>