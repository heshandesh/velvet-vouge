<?php
include '../../db.php';
include '../../controllers/cart-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $controller = new CartController($conn);
    dbConnection:
    $data = $controller->getByUserId($id);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>