<?php
include '../../db.php';
include '../../controllers/gender-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new GenderController($conn);
    $data = $controller->get();
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>