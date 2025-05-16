<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/size-model.php";

class SizeController
{
    private $sizeModel;

    public function __construct($dbConnection)
    {
        $this->sizeModel = new SizeModel($dbConnection);
    }

    public function get()
    {
        return $this->sizeModel->get();
    }

    public function getByIds($ids)
    {
        return $this->sizeModel->getByIds($ids);
    }
}
?>