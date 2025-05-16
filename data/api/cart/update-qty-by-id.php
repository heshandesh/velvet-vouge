<?php
include '../../db.php';
include '../../controllers/cart-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new CartController($conn);
    $response = $controller->updateQtyById($data);
    echo json_encode(['success' => $response]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>