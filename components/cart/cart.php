<?php
$isFetchRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$isFetchRequest) {
  header('Location: ../../pages/index.php');
  exit();
}
?>

<div class="cart" id="divCart">
  <div class="close-overlay" onclick="ToggleCart()"></div>
  <div class="bag" id="bag">
    <div class="item">
      <div class="close hover" onclick="ToggleCart()">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <h3>Shopping Bag</h3>
      <p>Selected Items</p>
      <div class="scroll-shadow shadow-top" id="scrollTopShadow"></div>
      <div class="scroll-shadow shadow-bottom" id="scrollBottomShadow"></div>
      <div class="product-container" id="divCartProductContainer" onscroll="Scroll()">

        <!-- <div class="product">
          <div class="image">
            <img src="../images/about/image1.jpg" alt="image" />
          </div>
          <div class="card">
            <h3>hqhendw wjdnw wjdn wjdnw awjdnd jawndn jwndnjwjdj wjdnw wjdnjw
            </h3>
            <p>LKR 42,000</p>
            <div class="count">
              <button>-</button>
              <span>10</span>
              <button>+</button>
            </div>
            <button class="remove-item">
              <i class="fa-solid fa-trash"></i>
            </button>
            </bu>
          </div>
        </div> -->
      </div>

    </div>
    <div class="check-out">
      <div class="total">
        <p>Total</p>
        <p id="pTotalPriceCart">Loading</p>
      </div>
      <div class="pay">
        <button onclick="ScrollCartToSpecificPosition()">Checkout</button>
      </div>
    </div>
  </div>