<?php
class ColorModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function get()
    {
        $sql = "SELECT * FROM color";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getByIds($ids)
    {
        $sql = "SELECT id, name, code FROM color WHERE FIND_IN_SET(id, ?) > 0;";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $ids);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }
}
?>