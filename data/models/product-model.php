<?php
class ProductModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function get()
    {
        $sql = "SELECT * FROM product";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getBySubId($id)
    {
        $sql = "SELECT product.*, sub_category.name AS category_name
        FROM product
        JOIN sub_category ON product.sub_category_id = sub_category.id
        WHERE product.sub_category_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $stmt->close();

        return $data;
    }
}
?>