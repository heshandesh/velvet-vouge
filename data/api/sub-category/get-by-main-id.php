<?php
include '../../db.php';
include '../../controllers/sub-category-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $controller = new SubCategoryController($conn);
    $data = $controller->getByMainId($id);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>