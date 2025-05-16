<?php
class StockModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function insert($data)
    {
        session_start();
        if (!isset($_SESSION['user'])) {
            return [
                'success' => false,
                'message' => 'not-logged-in'
            ];
        }

        if ($_SESSION['role'] != 1) {
            return [
                'success' => false,
                'message' => 'Not authorized!'
            ];
        }

        $name = $data['name'];
        $product_id = $data['product'];
        $type_id = $data['type'];
        $gender_id = $data['gender'];
        $color_id = $data['color'];
        $size_id = $data['size'];
        $qty = $data['qty'];
        $cover = $data['cover'];
        $price = $data['price'];
        $discount = $data['discount'];
        $other_images = json_encode($data['other_images']);
        $id = $data['id'];
        $user_id = $_SESSION['user'];

        $sql = "CALL InsertStock(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?
        )";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "siisiiisdssii",
            $name,
            $product_id,
            $type_id,
            $gender_id,
            $color_id,
            $size_id,
            $qty,
            $cover,
            $price,
            $discount,
            $other_images,
            $id,
            $user_id
        );

        if ($stmt->execute()) {
            return [
                'success' => true,
                'message' => 'Product created successfully!'
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Internal server error occured!'
            ];
        }
    }


    public function get($data)
    {
        $startRow = $data['startRow'];
        $pageSize = $data['pageSize'];
        $type_ids = $data['type_ids'];
        $gender_ids = $data['gender_ids'];
        $color_ids = $data['color_ids'];
        $size_ids = $data['size_ids'];
        $search_name = $data['search_name'];
        $price_start = $data['price_start'];
        $price_end = $data['price_end'];
        $product_id = $data['product_id'];

        $sql = "CALL GetStock(
            ?,?,?,?,?,?,?,?,?,?
        )";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param(
            "iisssssiii",
            $startRow,
            $pageSize,
            $type_ids,
            $gender_ids,
            $color_ids,
            $size_ids,
            $search_name,
            $price_start,
            $price_end,
            $product_id
        );

        $stmt->execute();

        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getTotalCount($data)
    {
        $type_ids = $data['type_ids'];
        $gender_ids = $data['gender_ids'];
        $color_ids = $data['color_ids'];
        $size_ids = $data['size_ids'];
        $search_name = $data['search_name'];
        $price_start = $data['price_start'];
        $price_end = $data['price_end'];

        $sql = "CALL GetStockTotalCount(
            ?,?,?,?,?,?,?
        )";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param(
            "sssssii",
            $type_ids,
            $gender_ids,
            $color_ids,
            $size_ids,
            $search_name,
            $price_start,
            $price_end
        );

        $stmt->execute();

        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getIdByFilters($data)
    {
        $color = $data['color'];
        $gender = $data['gender'];
        $size = $data['size'];
        $type = $data['type'];
        $product = $data['product'];

        $sql = "CALL GetStockIdByFilters(
            ?,?,?,?,?
        )";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param(
            "iiiii",
            $color,
            $gender,
            $size,
            $type,
            $product
        );

        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    public function getById($id)
    {
        $sql = "CALL GetStockByID(?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }
    public function delete($id)
    {
        $sql = "CALL DeleteStock(?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function getRandom()
    {
        $sql = "CALL GetRandom()";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getPromotions()
    {
        $sql = "CALL GetPromotions()";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function getNewArrivals()
    {
        $sql = "CALL GetNewArrivals()";
        $result = $this->conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }
}
?>