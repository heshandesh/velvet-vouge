<?php
$isFetchRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$isFetchRequest) {
  header('Location: ../../pages/index.php');
  exit();
}
?>

<div class="footer-container">
  <div class="footer">
    <div class="navigation">
      <div class="intro">
        <h3>Velvet Vogue</h3>
        <p>
          Explore the latest in trendy casualwear and elegant formal wear at
          Velvet Vogue. Discover stylish clothing and accessories designed for
          young adults looking to express their unique identity.
        </p>
      </div>
      <div class="category" id="divFooterCategoryList">
        <!-- <h3>Category</h3>
        <a href="">Casual Wear</a>
        <a href="">Formal Wear</a>
        <a href="">Outerwear</a>
        <a href="">Underwear</a>
        <a href="">Accessories</a>
        <a href="">Summer</a> -->
      </div>
      <div class="help">
        <h3>Help</h3>
        <a href="support.php">Support</a>
      </div>
      <div class="pages">
        <h3>Pages</h3>
        <a href="index.php">Home</a>
        <a href="about.php">About</a>
        <a href="contact.php">Contact</a>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <button onclick="window.open('https://wa.me/94742252514')">Live Chat</button>
      </div>
    </div>
    <hr />
    <div class="footer">
      <div class="left">
        © Velvet Vogue Clothing Company 2024. All rights reserved.
      </div>
      <div class="right">
        <div class="text">Secure Payment</div>
        <div class="payment-methods">
          <i class="fa-brands fa-cc-visa"></i>
          <i class="fa-brands fa-cc-mastercard"></i>
        </div>
      </div>
    </div>
  </div>
</div>