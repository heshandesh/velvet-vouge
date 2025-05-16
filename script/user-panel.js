function CloseUserPanel() {
  document.getElementById("userPanel").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("userPanel").style.display = "none";
  }, 300);
  document.getElementById("navBarOverlay").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("navBarOverlay").style.display = "none";
  }, 300);
}

function OpenUserPanel() {
  document.getElementById("userPanel").style.display = "flex";
  document.getElementById("userPanel").style.opacity = "1";
  document.getElementById("navBarOverlay").style.display = "block";
  document.getElementById("navBarOverlay").style.opacity = "1";
}
