<?php
include '../../db.php';
include '../../controllers/stock-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new StockController($conn);
    $response = $controller->insertStock($data);
    echo json_encode($response);
}
?>