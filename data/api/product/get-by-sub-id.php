<?php
include '../../db.php';
include '../../controllers/product-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $controller = new ProductController($conn);
    $data = $controller->getBySubId($id);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>