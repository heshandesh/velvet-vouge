<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/filter-model.php";

class FilterController
{
    private $filterModel;

    public function __construct($dbConnection)
    {
        $this->filterModel = new FilterModel($dbConnection);
    }

    public function getById($id)
    {
        return $this->filterModel->getById($id);
    }
}
?>