function SearchClick() {
  document.getElementById("divSearch").style.width = "300px";
  document.getElementById("navBarOverlay").style.display = "block";
  document.getElementById("navBarOverlay").style.opacity = "1";
  document.getElementById("divSearchPanel").style.display = "block";
  document.getElementById("divSearchPanel").style.opacity = "1";
}

function SearchRelease() {
  document.getElementById("divSearch").style.width = "200px";
  document.getElementById("divSearchPanel").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("divSearchPanel").style.display = "none";
  }, 300);
}
