<?php
include '../../db.php';
include '../../controllers/sub-category-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new SubCategoryController($conn);
    $data = $controller->get();
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>