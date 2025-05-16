<?php
class SubCategoryModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function get()
    {
        $sql = "SELECT * FROM sub_category";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getByMainId($id)
    {
        $sql = "SELECT sub_category.*, category.name AS category_name
        FROM sub_category
        JOIN category ON sub_category.category_id = category.id
        WHERE sub_category.category_id = ?";
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