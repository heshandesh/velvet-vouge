<?php
$input = json_decode(file_get_contents('php://input'), true);
if (isset($input['path']) && isset($input['filenames'])) {
    $path = $input['path'];
    $filenames = $input['filenames'];
    $response = [];

    foreach ($filenames as $filename) {
        $filePath = $path . '/' . $filename;
        if (file_exists($filePath)) {
            if (unlink($filePath)) {
                $response[] = "File $filename deleted successfully.";
            } else {
                $response[] = "Error deleting file $filename.";
            }
        } else {
            $response[] = "File $filename does not exist.";
        }
    }
    echo json_encode($response);
} else {
    echo json_encode(["error" => "Invalid input."]);
}
?>