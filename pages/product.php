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
  <link rel="stylesheet" href="../css/product.css" />
  <script src="https://kit.fontawesome.com/01f74f74c3.js" crossorigin="anonymous"></script>
</head>

<body>
  <div class="product-view-container">
    <div class="product-view" id="divProductView">
      <div class="other-images" id="divOtherImages">
        <!-- <div class="other-image">
            <img src="../images/banner/image3.jpg" alt="" />
          </div>
          <div class="other-image">
            <img src="../images/banner/image4.jpg" alt="" />
          </div>
          <div class="other-image clicked">
            <img src="../images/banner/image2.jpg" alt="" />
          </div>
          <div class="other-image">
            <img src="../images/banner/image3.jpg" alt="" />
          </div>
          <div class="other-image">
            <img src="../images/banner/image4.jpg" alt="" />
          </div>
          <div class="other-image">
            <img src="../images/banner/image1.jpg" alt="" />
          </div> -->
      </div>
      <div class="image">
        <div id="divStockStatus" class="stock-status">Hello</div>
        <img id="imgProductCover" />
      </div>
      <div class="content">
        <h3 class="title" id="h3ProductTitle">Loading...</h3>
        <p class="price" id="pProductPrice">Loading...</p>
        <p class="old_price" id="pProductOldPrice">Loading...</p>
        <hr />
        <p class="tag-title">Colors</p>
        <div class="tags colors" id="divProductColorList">
          <!-- <button class="black active"></button>
            <button class="white"></button>
            <button class="pink"></button>
            <button class="red"></button>
            <button class="orange"></button>
            <button class="yellow"></button>
            <button class="green"></button>
            <button class="blue"></button> -->
        </div>
        <hr />
        <p class="tag-title">Sizes</p>
        <div class="tags sizes" id="divProductSizeList">
          <!-- <button class="active">M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button> -->
        </div>
        <hr />
        <p class="tag-title">Type</p>
        <div class="tags types" id="divProductTypeList">
          <!-- <button class="active">Cotton</button>
            <button>Silic</button> -->
        </div>
        <hr />
        <p class="tag-title">Gender</p>
        <div class="tags genders" id="divProductGenderList">
          <!-- <button class="active">Men</button>
            <button>Women</button>
            <button>Unisex</button> -->
        </div>
        <div class="action">
          <div class="qty">
            <button onclick="UpdateItemQty(-1)">-</button>
            <span id="spanItemCount">Loading</span>
            <button onclick="UpdateItemQty(1)">+</button>
          </div>
          <button onclick="AddItemToCart()" class="cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="review-container">
    <div class="grid-title">Reviews</div>
    <div class="review-product">
      <div class="star-card">
        <h3 id="h3RatingValue">:0</h3>
        <div class="stars">
          <i class="rating-star-main fa-solid fa-star"></i>
          <i class="rating-star-main fa-solid fa-star"></i>
          <i class="rating-star-main fa-solid fa-star"></i>
          <i class="rating-star-main fa-solid fa-star"></i>
          <i class="rating-star-main fa-solid fa-star"></i>
        </div>
        <p id="pRatingCount">Loading...</p>
        <button onclick="AddItemToCart()" class="cart-button">
          Buy this item to POST a review
        </button>
      </div>
      <form class="post-review">
        <label for="message">Write a review</label>
        <textarea name="message"></textarea>
        <div class="action">
          <p class="number" id="pReviewValue">5.0</p>
          <div class="stars">
            <i onmouseenter="ReviewStar(1)" class="fa-solid fa-star active" id="review-star-1"></i>
            <i onmouseenter="ReviewStar(2)" class="fa-solid fa-star active" id="review-star-2"></i>
            <i onmouseenter="ReviewStar(3)" class="fa-solid fa-star active" id="review-star-3"></i>
            <i onmouseenter="ReviewStar(4)" class="fa-solid fa-star active" id="review-star-4"></i>
            <i onmouseenter="ReviewStar(5)" class="fa-solid fa-star active" id="review-star-5"></i>
          </div>
          <button type="submit">POST</button>
        </div>
      </form>
      <div class="reviews" id="ratingPosts">
        <!-- <div class="review-card">
          <div class="profile">
            <div class="icon">
              <img src="../images/about/image2.jpg" alt="" />
            </div>
            <div class="content">
              <p class="name">Heshan Deshapriya</p>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="date">2024-10-10</p>
            </div>
          </div>
          <div class="content">
            <p>Good Product</p>
          </div>
        </div>

        <hr />

        <div class="review-card">
          <div class="profile">
            <div class="icon">
              <img src="../images/about/image2.jpg" alt="" />
            </div>
            <div class="content">
              <p class="name">Heshan Deshapriya</p>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="date">2024-10-10</p>
            </div>
          </div>
          <div class="content">
            <p>
              I recently purchased the UltraBlend 5000 Blender, and it has
              exceeded my expectations in almost every way. Right out of the
              box, it feels sturdy and well-made. The design is sleek, and it
              doesn’t take up too much space on my counter, which is a huge
              plus. The performance is outstanding. It handles everything from
              smoothies to nut butter with ease, thanks to its powerful motor
              and sharp blades. I especially appreciate the multiple speed
              settings, which allow for different textures depending on what
              I'm making. Cleaning is surprisingly easy as well; most parts
              are dishwasher-safe, and the self-cleaning mode works pretty
              well. One minor downside is the noise. While I expected some
              sound given its power, it’s a bit louder than I’d like. Still,
              given its efficiency and results, I’m willing to overlook it.
            </p>
          </div>
        </div>

        <hr />

        <div class="review-card">
          <div class="profile">
            <div class="icon">
              <img src="../images/about/image2.jpg" alt="" />
            </div>
            <div class="content">
              <p class="name">Heshan Deshapriya</p>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p class="date">2024-10-10</p>
            </div>
          </div>
          <div class="content">
            <p>
              I recently purchased the UltraBlend 5000 Blender, and it has
              exceeded my expectations in almost every way. Right out of the
              box, it feels sturdy and well-made. The design is sleek, and it
              doesn’t take up too much space on my counter, which is a huge
              plus. The performance is outstanding. It handles everything from
              smoothies to nut butter with ease, thanks to its powerful motor
              and sharp blades. I especially appreciate the multiple speed
              settings, which allow for different textures depending on what
              I'm making. Cleaning is surprisingly easy as well; most parts
              are dishwasher-safe, and the self-cleaning mode works pretty
              well. One minor downside is the noise. While I expected some
              sound given its power, it’s a bit louder than I’d like. Still,
              given its efficiency and results, I’m willing to overlook it.
            </p>
          </div>
        </div> -->
      </div>
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
  <script src="../components/footer/footer.js" type="module"></script>
  <script src="../components/cart/cart.js" type="module"></script>
  <script src="../components/nav-bar/nav-bar.js" type="module"></script>
  <script src="../script/dark-mode.js"></script>
  <script src="../script/user-panel.js"></script>
  <script src="../script/cart.js"></script>
  <script src="../script/search.js"></script>
  <script src="../script/nav-bar-overlay.js"></script>
  <script src="../script/product.js" type="module"></script>
  <script src="../script/product-page.js" type="module"></script>
</body>

</html>