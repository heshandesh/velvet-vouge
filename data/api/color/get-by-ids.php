<?php
include '../../db.php';
include '../../controllers/color-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $ids = $_GET['ids'];
    $controller = new ColorController($conn);
    $data = $controller->getByIds($ids);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>