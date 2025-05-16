<?php
include '../../db.php';
include '../../controllers/auth-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new AuthController($conn);
    $response = $controller->insert($data);
    echo json_encode(['success' => $response]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>