import {
  DeleteCartDetail,
  GetCartDetailsByUserId,
  UpdateCartQtyByID,
} from "../../data/services/cart.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/cart/cart.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("cart").innerHTML = data;
      loadCartDetails();
    })
    .catch((error) => console.error("Error fetching content:", error));
});

let exceededId;

window.loadCartDetails = async function () {
  const data = await GetCartDetailsByUserId(1);
  const totalPrice =
    data && data.data && data.data[0] ? data.data[0].total_price : "0.00";
  const itemCount =
    data && data.data && data.data[0] ? data.data[0].total_count : 0;
  document.getElementById("pTotalPriceCart").textContent = totalPrice;
  document.getElementById("pCartItemCount").textContent = itemCount;
  const divCartProductContainer = document.getElementById(
    "divCartProductContainer"
  );
  if (!divCartProductContainer) return;
  if (data.data.length == 0) {
    divCartProductContainer.innerHTML = "No Items";
    return;
  }
  exceededId = data.data[0].first_exceeds_stock;
  divCartProductContainer.innerHTML = "";
  data.data.forEach((data) => {
    let item = "";

    if (data.qty > data.stock_qty) {
      item += `<div class="product product-error" id="product-card-${data.id}">`;
    } else {
      item += `<div class="product">`;
    }

    if (data.qty == data.stock_qty) {
      item += `
        <div class="stock-status all-selected">
          All items in stock are selected
        </div>
      `;
    }

    if (data.qty > data.stock_qty && data.stock_qty != 0) {
      item += `
        <div class="stock-status mis-match">
          Only ${data.stock_qty} item left in stock
        </div>
      `;
    }

    if (data.qty > data.stock_qty && data.stock_qty == 0) {
      item += `
        <div class="stock-status mis-match">
          Out of stock
        </div>
      `;
    }

    item += `
        <div class="image">
          <img src="../images/product/cover/${data.cover}" alt="image" />
        </div>
    `;

    item += `<div class="card">`;

    item += `
        <h3>${data.display_name}</h3>
        <p>LKR ${data.new_price}</p>
    `;

    if (data.discount != 0) {
      item += `
            <p class="old-price">LKR ${data.price}</p>
        `;
    }

    item += `
        <p class="amount">LKR ${data.total_amount}</p>
        <hr/>
        <div class="count">
          <button onclick="UpdateCartQty(-1, ${data.id})">-</button>
          <span>${data.qty}</span>
          <button onclick="UpdateCartQty(1, ${data.id})">+</button>
        </div>
        <button onclick="DeleteCartItem(${data.id})" class="remove-item">
          <i class="fa-solid fa-trash"></i>
        </button>
    `;

    item += `</div>`;

    item += `</div>`;

    divCartProductContainer.innerHTML += item;
  });
};

window.ScrollCartToSpecificPosition = function () {
  console.log("hii");
  let itemId = "product-card-" + exceededId;
  console.log(itemId);
  var element = document.getElementById(itemId);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

window.UpdateCartQty = async function (value, id) {
  const data = {
    cart_id: id,
    value: value,
  };
  await UpdateCartQtyByID(data);
  loadCartDetails();
};

window.DeleteCartItem = async function (id) {
  await DeleteCartDetail(id);
  loadCartDetails();
};
