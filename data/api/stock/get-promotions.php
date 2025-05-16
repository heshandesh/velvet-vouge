<?php
include '../../db.php';
include '../../controllers/stock-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new StockController($conn);
    $data = $controller->getPromotions();
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>