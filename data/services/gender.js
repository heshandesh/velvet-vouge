export async function GetAllGenders() {
  const response = await fetch("../data/api/gender/get.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetAllGendersByIds(ids) {
  const response = await fetch(`../data/api/gender/get-by-ids.php?ids=${ids}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
