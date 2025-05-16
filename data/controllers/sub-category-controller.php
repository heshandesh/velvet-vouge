<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/sub-category-model.php";

class SubCategoryController
{
    private $subCategoryModel;

    public function __construct($dbConnection)
    {
        $this->subCategoryModel = new SubCategoryModel($dbConnection);
    }

    public function get()
    {
        return $this->subCategoryModel->get();
    }

    public function getByMainId($id)
    {
        return $this->subCategoryModel->getByMainId($id);
    }
}
?>