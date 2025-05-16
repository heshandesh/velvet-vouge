<?php
include '../../db.php';
include '../../controllers/auth-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_GET['email'];
    $password = $_GET['password'];
    $controller = new AuthController($conn);
    dbConnection:
    $data = $controller->checkEmailAndPassword($email, $password);
    email:
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>