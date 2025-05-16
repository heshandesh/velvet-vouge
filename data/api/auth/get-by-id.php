<?php
include '../../db.php';
include '../../controllers/auth-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new AuthController($conn);
    $data = $controller->getById();
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>