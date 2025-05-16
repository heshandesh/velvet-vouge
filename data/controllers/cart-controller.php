<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/cart-model.php";

class CartController
{
    private $cartModel;

    public function __construct($dbConnection)
    {
        $this->cartModel = new CartModel($dbConnection);
    }

    public function insert($data)
    {
        return $this->cartModel->insert($data);
    }

    public function updateQtyById($data)
    {
        return $this->cartModel->updateQtyById($data);
    }

    public function getByUserId($id)
    {
        return $this->cartModel->getByUserId($id);
    }

    public function delete($id)
    {
        return $this->cartModel->delete($id);
    }
}
?>