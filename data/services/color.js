export async function GetAllColors() {
  const response = await fetch("../data/api/color/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetAllColorsByIds(ids) {
  const response = await fetch(`../data/api/color/get-by-ids.php?ids=${ids}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
