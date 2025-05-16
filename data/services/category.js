export async function GetAllCategories() {
  const response = await fetch("../data/api/category/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
