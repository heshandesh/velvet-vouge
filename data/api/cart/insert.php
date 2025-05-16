<?php
include '../../db.php';
include '../../controllers/cart-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new CartController($conn);
    $response = $controller->insert($data);
    echo json_encode($response);
}
?>