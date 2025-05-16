export async function GetAllTypes() {
  const response = await fetch("../data/api/type/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetAllTypesByIds(ids) {
  const response = await fetch(`../data/api/type/get-by-ids.php?ids=${ids}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
