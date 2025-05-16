<?php
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/db.php";
include "{$_SERVER['DOCUMENT_ROOT']}/Velvet/data/models/auth-model.php";

class AuthController
{
    private $authModel;

    public function __construct($dbConnection)
    {
        $this->authModel = new AuthModel($dbConnection);
    }

    public function insert($data)
    {
        return $this->authModel->insert($data);
    }

    public function checkEmail($email)
    {
        return $this->authModel->checkEmail($email);
    }

    public function checkEmailAndPassword($email, $password)
    {
        return $this->authModel->checkEmailAndPassword($email, $password);
    }

    public function getById()
    {
        return $this->authModel->getById();
    }
}
?>