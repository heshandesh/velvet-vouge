<?php
include '../../db.php';
include '../../controllers/type-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $ids = $_GET['ids'];
    $controller = new TypeController($conn);
    $data = $controller->getByIds($ids);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>