<?php
include '../../db.php';
include '../../controllers/cart-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $controller = new CartController($conn);
    $response = $controller->delete($id);
    echo json_encode(['success' => $response]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>