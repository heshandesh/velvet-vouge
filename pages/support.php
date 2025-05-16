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
    <link rel="stylesheet" href="../css/support.css" />
    <script
      src="https://kit.fontawesome.com/01f74f74c3.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <div class="inquiry-container">
      <div class="inquiry">
        <div class="make-inquiry">
          <h3>Inquiry</h3>
          <p>Make an Inquiry</p>
          <form action="" method="POST">
            <label for="message">Message</label>
            <textarea name="message" id="message"></textarea>
            <button>Post</button>
          </form>
        </div>
        <div class="your-inquiry">
          <p class="tab-title">Your Inquiries</p>
          <div class="inquiries">
            <div class="inquiry-card">
              <div class="content">
                <p class="title">
                  HelloHelloHel loHello HelloHe
                  lloHelloHelloHelloHelloHelloHello
                </p>
                <p class="date">2023</p>
              </div>
              <p class="status active">Active</p>
              <div class="action">
                <button class="view">View</button>
                <button class="delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
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
