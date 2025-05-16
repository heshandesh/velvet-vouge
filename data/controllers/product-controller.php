<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/product-model.php";

class ProductController
{
    private $productModel;

    public function __construct($dbConnection)
    {
        $this->productModel = new ProductModel($dbConnection);
    }

    public function get()
    {
        return $this->productModel->get();
    }

    public function getBySubId($id)
    {
        return $this->productModel->getBySubId($id);
    }
}
?>