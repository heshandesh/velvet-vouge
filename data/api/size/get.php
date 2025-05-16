<?php
include '../../db.php';
include '../../controllers/size-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new SizeController($conn);
    dbConnection:
    $data = $controller->get();
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>