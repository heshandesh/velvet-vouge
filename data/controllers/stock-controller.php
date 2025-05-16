<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/stock-model.php";

class StockController
{
    private $stockModel;

    public function __construct($dbConnection)
    {
        $this->stockModel = new StockModel($dbConnection);
    }

    public function insertStock($data)
    {
        return $this->stockModel->insert($data);
    }

    public function get($data)
    {
        return $this->stockModel->get($data);
    }

    public function getRandom()
    {
        return $this->stockModel->getRandom();
    }

    public function getPromotions()
    {
        return $this->stockModel->getPromotions();
    }

    public function getNewArrivals()
    {
        return $this->stockModel->getNewArrivals();
    }

    public function getIdByFilters($data)
    {
        return $this->stockModel->getIdByFilters($data);
    }

    public function getTotalCount($data)
    {
        return $this->stockModel->getTotalCount($data);
    }

    public function getById($id)
    {
        return $this->stockModel->getById($id);
    }

    public function delete($id)
    {
        return $this->stockModel->delete($id);
    }
}
?>