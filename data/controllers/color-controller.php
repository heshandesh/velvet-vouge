<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/color-model.php";

class ColorController
{
    private $colorModel;

    public function __construct($dbConnection)
    {
        $this->colorModel = new ColorModel($dbConnection);
    }

    public function get()
    {
        return $this->colorModel->get();
    }

    public function getByIds($ids)
    {
        return $this->colorModel->getByIds($ids);
    }
}
?>