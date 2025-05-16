import {
  GetNewArrivals,
  GetPromotions,
  GetRandom,
} from "../data/services/stock.js";

document.addEventListener("DOMContentLoaded", () => {
  LoadPromotionList();
  LoadProductList();
  LoadNewArrivalList();
  // LoadExploreProductList();
});

//Need to change
async function LoadNewArrivalList() {
  const data = await GetNewArrivals();
  console.log(data);
  const divIndexNewArrivalList = document.getElementById(
    "divIndexNewArrivalList"
  );
  if (!divIndexNewArrivalList) return;
  data.data.forEach((data) => {
    divIndexNewArrivalList.innerHTML += `
      <div class="item" onclick="location.href='product.php?id=${data.id}'">
        <div class="label new-arrivals">New</div>
        <div class="image">
          <img src="../images/product/cover/${data.cover}" alt="image" />
        </div>
        <h3>${data.display_name}</h3>
        <p>LKR ${data.new_price}</p>
      </div>
    `;
  });
}

async function LoadPromotionList() {
  const data = await GetPromotions();
  console.log(data);
  const divIndexPromotionList = document.getElementById(
    "divIndexPromotionList"
  );
  if (!divIndexPromotionList) return;
  data.data.forEach((data) => {
    divIndexPromotionList.innerHTML += `
      <div class="item" onclick="location.href='product.php?id=${data.id}'">
        <div class="label discounts">${data.perc_discount}% Off</div>
        <div class="image">
          <img src="../images/product/cover/${data.cover}" alt="image" />
        </div>
        <h3>${data.display_name}</h3>
        <p>LKR ${data.new_price}</p>
        <p><s>LKR ${data.price}</s></p>
      </div>
    `;
  });
}

async function LoadProductList() {
  const data = await GetRandom();
  console.log(data);
  const divIndexProductList = document.getElementById("divIndexProductList");
  if (!divIndexProductList) return;
  data.data.forEach((data) => {
    divIndexProductList.innerHTML += `
      <div class="item" onclick="location.href='product.php?id=${data.id}'">
        <div class="image">
          <img src="../images/product/cover/${data.cover}" alt="image" />
        </div>
        <h3>${data.display_name}</h3>
        <p>LKR ${data.price}</p>
      </div>
    `;
  });
  divIndexProductList.innerHTML += `
      <div class="load-more" onclick="location.href='shop.php'">
          <button>Show More</button>
        </div>
    `;
}

// async function LoadExploreProductList() {
//   const data = await GetRandom();
//   console.log(data);
//   const divViewProductList = document.getElementById("divViewProductList");
//   if (!divViewProductList) return;
//   data.data.forEach((data) => {
//     divViewProductList.innerHTML += `
//       <div class="item">
//         <div class="image">
//           <img src="../images/product/${
//             data.cover ? data.cover : "not-found.jpg"
//           }" alt="image" />
//         </div>
//         <h3>${data.name}</h3>
//         <p>LKR ${data.price}</p>
//       </div>
//     `;
//   });
// }

window.ReviewStar = function (num) {
  for (let i = 1; i <= 5; i++) {
    document
      .getElementById(`review-star-${i}`)
      .classList.toggle("active", i <= num);
  }
  document.getElementById("pReviewValue").textContent = num + ".0";
};
