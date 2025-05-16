export async function GetRatingsByStockID(id) {
  const response = await fetch(`../data/api/rating/get-by-id.php?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(await response.text());
  const data = await response.json();
  return data;
}
