const body = document.body;

function SetTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

function ToggleMode() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light"); // or remove the item if you prefer
  }
}

SetTheme();
