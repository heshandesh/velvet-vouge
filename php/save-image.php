<?php
$uploadDir = isset($_POST['uploadDir']) ? $_POST['uploadDir'] : '../images/unknown/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = ['success' => false, 'files' => []];

foreach ($_FILES as $file) {
    $fileName = basename($file['name']);
    $targetFile = $uploadDir . $fileName;

    // Get image dimensions
    list($width, $height) = getimagesize($file['tmp_name']);

    if ($width > 400) {
        $newWidth = 400;
        $newHeight = ($height / $width) * $newWidth;

        $imageType = exif_imagetype($file['tmp_name']);
        switch ($imageType) {
            case IMAGETYPE_JPEG:
                $srcImage = imagecreatefromjpeg($file['tmp_name']);
                break;
            case IMAGETYPE_PNG:
                $srcImage = imagecreatefrompng($file['tmp_name']);
                break;
            case IMAGETYPE_GIF:
                $srcImage = imagecreatefromgif($file['tmp_name']);
                break;
            default:
                $response['files'][] = 'Invalid image type for ' . $fileName;
                continue 2;
        }

        $dstImage = imagecreatetruecolor($newWidth, $newHeight);

        imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        switch ($imageType) {
            case IMAGETYPE_JPEG:
                imagejpeg($dstImage, $targetFile);
                break;
            case IMAGETYPE_PNG:
                imagepng($dstImage, $targetFile);
                break;
            case IMAGETYPE_GIF:
                imagegif($dstImage, $targetFile);
                break;
        }

        imagedestroy($srcImage);
        imagedestroy($dstImage);
    } else {
        move_uploaded_file($file['tmp_name'], $targetFile);
    }

    $response['files'][] = $targetFile;
}

if (!empty($response['files'])) {
    $response['success'] = true;
}
echo json_encode($response);
?>