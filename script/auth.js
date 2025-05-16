import {
  CheckEmailAlreadyRegistered,
  RegisterUser,
  VerifyEmailAndPassword,
} from "../data/services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const registerParam = urlParams.get("register");
  const loginParam = urlParams.get("login");

  if (registerParam !== null) {
    document.getElementById("authImage").classList.add("register-image");
    document.getElementById("authImage").classList.remove("login-image");
    document.getElementById("authImage").classList.remove("success-image");
    document.getElementById("divAuthLogin").style.display = "none";
    document.getElementById("divAuthRegister").style.display = "block";
    document.getElementById("divRegisterSuccess").style.display = "none";
  } else if (loginParam !== null) {
    document.getElementById("authImage").classList.add("login-image");
    document.getElementById("authImage").classList.remove("register-image");
    document.getElementById("authImage").classList.remove("success-image");
    document.getElementById("divAuthLogin").style.display = "block";
    document.getElementById("divAuthRegister").style.display = "none";
    document.getElementById("divRegisterSuccess").style.display = "none";
  } else {
    document.getElementById("authImage").classList.add("success-image");
    document.getElementById("authImage").classList.remove("register-image");
    document.getElementById("authImage").classList.remove("login-image");
    document.getElementById("divRegisterSuccess").style.display = "block";
    document.getElementById("divAuthLogin").style.display = "none";
    document.getElementById("divAuthRegister").style.display = "none";
  }

  document
    .getElementById("frmRegister")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);

      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      const emailAlreadyIn = await CheckEmailAlreadyRegistered(
        jsonObject.email
      );

      if (emailAlreadyIn.data == true) {
        alert("Email is already registered! Use different email address.");
        return;
      }

      const response = await RegisterUser(jsonObject);
      if (!response.success) return;
      event.target.reset();
      location.href = "?success";
    });

  document
    .getElementById("frmLogin")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);

      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      const emailAlreadyIn = await CheckEmailAlreadyRegistered(
        jsonObject.email
      );

      if (emailAlreadyIn.data == false) {
        alert("Email is not registered! Try again.");
        return;
      }

      const pwVerified = await VerifyEmailAndPassword(
        jsonObject.email,
        jsonObject.password
      );

      if (pwVerified.data == false) {
        alert("Wrong password! Try again.");
        return;
      }
      event.target.reset();
      location.href = "index.php";
    });
});
