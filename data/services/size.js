export async function GetAllSizes() {
  const response = await fetch("../data/api/size/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetAllSizesByIds(ids) {
  const response = await fetch(`../data/api/size/get-by-ids.php?ids=${ids}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
