<?php
include '../../db.php';
include '../../controllers/stock-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new StockController($conn);
    $data = $controller->get($data);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>