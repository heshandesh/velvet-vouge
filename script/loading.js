function Loading(isLoading) {
  console.log("LoadCalled");
  const divLoading = document.getElementById("divLoading");
  if (isLoading) {
    divLoading.style.display = "flex";
    divLoading.style.opacity = "1";
  } else {
    divLoading.style.opacity = "0";
    setTimeout(() => {
      divLoading.style.display = "none";
    }, 300);
  }
}
