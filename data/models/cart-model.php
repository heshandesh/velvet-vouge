<?php
class CartModel
{
    private $conn;

    public function __construct($dbConnection)
    {
        $this->conn = $dbConnection;
    }

    public function getByUserId($id)
    {
        $sql = "CALL GetCartDetailsByUserId(?)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param("i", $id);

        $stmt->execute();

        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
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

        $in_user_id = $_SESSION['user'];
        $in_stock_id = $data['stock_id'];
        $in_qty = $data['qty'];

        $sql = "CALL AddToCart(?,?,?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "iii",
            $in_user_id,
            $in_stock_id,
            $in_qty
        );

        if ($stmt->execute()) {
            return [
                'success' => true,
                'message' => 'Added to cart!'
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Internal server error occured!'
            ];
        }
    }

    public function updateQtyById($data)
    {
        $in_cart_id = $data['cart_id'];
        $in_change_value = $data['value'];

        $sql = "CALL UpdateCartQty(?,?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "ii",
            $in_cart_id,
            $in_change_value
        );

        return $stmt->execute();
    }
    public function delete($id)
    {
        $sql = "DELETE FROM cart WHERE id=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>