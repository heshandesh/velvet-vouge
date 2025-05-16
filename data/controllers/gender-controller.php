<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/gender-model.php";

class GenderController
{
    private $genderModel;

    public function __construct($dbConnection)
    {
        $this->genderModel = new GenderModel($dbConnection);
    }

    public function get()
    {
        return $this->genderModel->get();
    }

    public function getByIds($ids)
    {
        return $this->genderModel->getByIds($ids);
    }
}
?>