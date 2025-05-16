<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Velvet Vogue</title>
    <link rel="stylesheet" href="../css/root.css" />
    <link rel="stylesheet" href="../css/animation.css" />
    <link rel="stylesheet" href="../css/auth.css" />
    <script
      src="https://kit.fontawesome.com/01f74f74c3.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <div class="auth-container">
      <div class="auth">
        <div class="auth-body">
          <div class="image" id="authImage"></div>
          <div class="content">
            <div class="data login" id="divAuthLogin">
              <h3>Login</h3>
              <p>Enter your credentials to login</p>
              <form id="frmLogin">
                <label for="email_login">Email</label>
                <input type="email" name="email" id="email_login" required />
                <label for="password_login">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password_login"
                  required
                />
                <button type="submit">Login</button>
                <a href="?register">Don't have an account? <u>Register</u></a>
              </form>
            </div>
            <div class="data login" id="divRegisterSuccess">
              <h3>Success</h3>
              <p>Register success. Please login with your credentials</p>
              <form>
                <button type="button" onclick="location.href='?login'">
                  Login
                </button>
              </form>
            </div>
            <div class="data register" id="divAuthRegister">
              <h3>Register</h3>
              <p>Fill these details to register an account</p>
              <form id="frmRegister">
                <input type="hidden" id="role_id" name="role_id" value="2" />
                <label for="name">Full Name</label>
                <input type="text" name="name" id="name" required />
                <label for="address1">Address Line 1</label>
                <input
                  type="text"
                  name="address_line_1"
                  id="address_line_1"
                  required
                />
                <label for="address2">Address Line 2</label>
                <input
                  type="text"
                  name="address_line_2"
                  id="address_line_2"
                  required
                />
                <label for="address3">Address Line 3</label>
                <input
                  type="text"
                  name="address_line_3"
                  id="address_line_3"
                  required
                />
                <label for="city">City</label>
                <input type="text" name="city" id="city" required />
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" required />
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Register</button>
                <a href="?login">Already have an account? <u>Login</u></a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="../script/dark-mode.js"></script>
    <script src="../script/auth.js" type="module"></script>
  </body>
</html>
