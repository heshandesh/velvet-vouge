<?php
include '../../db.php';
include '../../controllers/auth-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];
    $controller = new AuthController($conn);
    dbConnection:
    $data = $controller->checkEmail($email);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>