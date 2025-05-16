<?php
include '../../db.php';
include '../../controllers/rating-controller.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    $controller = new RatingController($conn);
    $data = $controller->getRatingsByID($id);
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>