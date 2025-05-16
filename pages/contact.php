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
  <link rel="stylesheet" href="../css/contact.css" />
  <script src="https://kit.fontawesome.com/01f74f74c3.js" crossorigin="anonymous"></script>
</head>

<body>
  <div class="contact-container">
    <div class="contact">
      <h3>Contact Us</h3>
      <form action="" method="POST">
        <label for="email">Your Email Address</label>
        <input type="email" name="email" id="email" required />
        <label for="message">Message</label>
        <textarea name="message" id="message" required></textarea>
        <button>Send</button>
      </form>
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
</body>

</html>