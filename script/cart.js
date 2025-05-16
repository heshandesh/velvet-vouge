let scrollTopShadow;
let scrollBottomShadow;
let productContainer;
let divCart;
let bag;

function GetElements() {
  scrollTopShadow = document.getElementById("scrollTopShadow");
  scrollBottomShadow = document.getElementById("scrollBottomShadow");
  productContainer = document.getElementById("divCartProductContainer");
  divCart = document.getElementById("divCart");
  bag = document.getElementById("bag");
}

function Scroll() {
  GetElements();
  const scrollTop = productContainer.scrollTop;
  const scrollHeight = productContainer.scrollHeight;
  const clientHeight = productContainer.clientHeight;

  if (scrollTop === 0) {
    scrollTopShadow.style.opacity = "0";
    setTimeout(() => {
      scrollTopShadow.style.display = "none";
    }, 300);
  } else {
    scrollTopShadow.style.display = "block";
    scrollTopShadow.style.opacity = "1";
  }

  if (
    productContainer.scrollHeight - productContainer.scrollTop ===
    productContainer.clientHeight
  ) {
    scrollBottomShadow.style.opacity = "0";
    setTimeout(() => {
      scrollBottomShadow.style.display = "none";
    }, 300);
  } else {
    scrollBottomShadow.style.display = "block";
    scrollBottomShadow.style.opacity = "1";
  }
}

function ToggleCart() {
  loadCartDetails();
  GetElements();
  if (divCart.classList.contains("show")) {
    divCart.classList.add("hide");
    bag.classList.add("hide-cart");
    setTimeout(() => {
      divCart.classList.toggle("show");
      divCart.classList.remove("hide");
      bag.classList.remove("hide-cart");
    }, 300);
  } else {
    divCart.classList.toggle("show");
  }
}
