<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/category-model.php";

class CategoryController
{
    private $categoryModel;

    public function __construct($dbConnection)
    {
        $this->categoryModel = new CategoryModel($dbConnection);
    }

    public function get()
    {
        return $this->categoryModel->get();
    }
}
?>