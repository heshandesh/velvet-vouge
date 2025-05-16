<?php
include '../../db.php';
include '../../controllers/filter-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $controller = new FilterController($conn);
    $data = $controller->getById($id);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>