import { GetAllCategories } from "../../data/services/category.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/footer/footer.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then(LoadCategories())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => console.error("Error fetching content:", error));
});

async function LoadCategories() {
  const data = await GetAllCategories();
  console.log(data);
  const divFooterCategoryList = document.getElementById(
    "divFooterCategoryList"
  );
  divFooterCategoryList.innerHTML = `<h3>Category</h3>`;
  data.data.forEach((data) => {
    divFooterCategoryList.innerHTML += `<a href="sub-category.php?sub=${data.id}">${data.name}</a>`;
  });
}
