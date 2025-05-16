document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/admin-nav/admin-nav.php", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("adminNav").innerHTML = data;
    })
    .then(setInterval(updateDateTime, 1000))
    .catch((error) => console.error("Error fetching content:", error));
});

function updateDateTime() {
  const dateElement = document.getElementById("pCurrentDate");
  const timeElement = document.getElementById("pCurrentTime");
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  dateElement.textContent = date;
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;
  timeElement.textContent = time;
}
