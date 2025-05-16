<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/rating-model.php";

class RatingController
{
    private $ratingModel;

    public function __construct($dbConnection)
    {
        $this->ratingModel = new RatingModel($dbConnection);
    }

    public function getRatingsByID($id)
    {
        return $this->ratingModel->getRatingsByID($id);
    }
}
?>