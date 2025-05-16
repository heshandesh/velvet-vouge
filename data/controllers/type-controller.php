<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/type-model.php";

class TypeController
{
    private $typeModel;

    public function __construct($dbConnection)
    {
        $this->typeModel = new TypeModel($dbConnection);
    }

    public function get()
    {
        return $this->typeModel->get();
    }

    public function getByIds($ids)
    {
        return $this->typeModel->getByIds($ids);
    }
}
?>