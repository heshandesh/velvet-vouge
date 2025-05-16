<?php
session_start();
$allowed_roles = [1];
if (!isset($_SESSION['user']) || !in_array($_SESSION['role'], $allowed_roles)) {
  header('Location: ../pages/auth.php?login');
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin - Velvet Vogue</title>
    <link rel="stylesheet" href="../css/root.css" />
    <link rel="stylesheet" href="../css/admin-nav.css" />
    <script
      src="https://kit.fontawesome.com/01f74f74c3.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div id="adminNav"></div>
    <script src="../components/admin-nav/admin-nav.js"></script>
    <script src="../script/dark-mode.js"></script>
  </body>
</html>
