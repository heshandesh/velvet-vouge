<?php
class RatingModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function getRatingsByID($id)
    {
        $sql = "
        SELECT
            r.value AS user_value,
            r.message AS user_message,
            u.name AS user_name,
            r.date AS submit_date,
            u.avatar AS user_avatar,
            (SELECT ROUND(SUM(value) / COUNT(*), 1) FROM rating WHERE stock_id = ?) AS value
        FROM
            rating r
        LEFT JOIN
            user u ON r.user_id = u.id
        WHERE
            r.stock_id = ?
        ";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $id, $id);
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