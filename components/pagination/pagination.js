document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/pagination/pagination.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("pagination").innerHTML = data;
    })
    .catch((error) => console.error("Error fetching content:", error));
});
