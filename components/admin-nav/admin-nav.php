<?php
$isFetchRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$isFetchRequest) {
  header('Location: ../../pages/index.php');
  exit();
}
?>

<div class="admin-nav-container">
  <div class="admin-nav">
    <div class="left">
      <div class="logo" onclick="location.href='../pages/index.php';"><i class="fa-brands fa-slack"></i></div>
      <div class="separator"></div>
      <h3>Admin</h3>
    </div>
    <div class="right">
      <p class="date" id="pCurrentDate">Loading...</p>
      <div class="separator"></div>
      <p class="time" id="pCurrentTime">Loading...</p>
      <div class="separator"></div>
      <button class="toggle" onclick="ToggleMode()">
        <i class="fa-solid fa-circle-half-stroke"></i>
      </button>
    </div>
  </div>
</div>