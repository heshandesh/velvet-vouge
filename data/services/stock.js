export async function GetAllStocks(params) {
  const response = await fetch("../data/api/stock/get.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}

export async function GetStockIdByFilters(filters) {
  const response = await fetch("../data/api/stock/get-id-by-filters.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  const data = await response.json();
  return data;
}

export async function GetTotalStockCount(params) {
  const response = await fetch("../data/api/stock/get-total-count.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}

export async function GetStockById(id) {
  const response = await fetch(`../data/api/stock/get-by-id.php?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function InsertStock(data) {
  const response = await fetch("../data/api/stock/insert.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // console.log(await response.text());
  const dt = await response.json();
  return dt;
}

export async function DeleteStock(id) {
  const response = await fetch(`../data/api/stock/delete.php`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  return data;
}

export async function GetRandom() {
  const response = await fetch("../data/api/stock/get-random.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetPromotions() {
  const response = await fetch("../data/api/stock/get-promotions.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function GetNewArrivals() {
  const response = await fetch("../data/api/stock/get-new-arrivals.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
