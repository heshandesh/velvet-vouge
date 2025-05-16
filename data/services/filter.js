export async function GetAllFiltersByProductID(id) {
  const response = await fetch(`../data/api/filter/get-by-id.php?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
