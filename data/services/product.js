export async function GetAllProducts() {
  const response = await fetch("../data/api/product/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetProductBySubCategoryId(id) {
  const response = await fetch(
    `../data/api/product/get-by-sub-id.php?id=${id}`,
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
