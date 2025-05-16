export async function GetCartDetailsByUserId(id) {
  const response = await fetch(`../data/api/cart/get-by-user-id.php?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function InsertCartDetails(data) {
  const response = await fetch("../data/api/cart/insert.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dt = await response.json();
  return dt;
}

export async function UpdateCartQtyByID(data) {
  const response = await fetch("../data/api/cart/update-qty-by-id.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dt = await response.json();
  return dt;
}

export async function DeleteCartDetail(id) {
  const response = await fetch("../data/api/cart/delete.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
}
