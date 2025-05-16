export async function GetAllSubCategories() {
  const response = await fetch("../data/api/sub-category/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetSubCategoriesByMainCategoryID(id) {
  const response = await fetch(
    `../data/api/sub-category/get-by-main-id.php?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
