function OverlayClick() {
  SearchRelease();
  CloseUserPanel();
  document.getElementById("navBarOverlay").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("navBarOverlay").style.display = "none";
  }, 300);
}
