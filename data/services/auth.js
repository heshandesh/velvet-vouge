export async function RegisterUser(data) {
  const response = await fetch("../data/api/auth/register.php", {
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

export async function CheckEmailAlreadyRegistered(email) {
  const response = await fetch(
    `../data/api/auth/check-email.php?email=${email}`,
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

export async function VerifyEmailAndPassword(email, password) {
  const response = await fetch(
    `../data/api/auth/check-email-n-password.php?email=${email}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function GetUserByID() {
  const response = await fetch(`../data/api/auth/get-by-id.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(await response.text());
  const data = await response.json();
  return data;
}
