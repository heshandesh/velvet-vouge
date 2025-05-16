-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2024 at 12:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `velvet_vogue`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddToCart` (IN `in_user_id` INT, IN `in_stock_id` INT, IN `in_qty` INT)   BEGIN
    DECLARE available_qty INT;

    SELECT qty INTO available_qty
    FROM stock
    WHERE id = in_stock_id
    LIMIT 1;

    IF available_qty < (SELECT COALESCE(SUM(qty), 0) FROM cart WHERE user_id = in_user_id AND stock_id = in_stock_id) + in_qty THEN
        SET in_qty = available_qty - (SELECT COALESCE(SUM(qty), 0) FROM cart WHERE user_id = in_user_id AND stock_id = in_stock_id);
    END IF;

    INSERT INTO cart (user_id, stock_id, qty)
    VALUES (in_user_id, in_stock_id, in_qty)
    ON DUPLICATE KEY UPDATE qty = qty + in_qty;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteStock` (IN `StockID` INT)   BEGIN
    DELETE FROM image WHERE stock_id = StockID;
    DELETE FROM stock WHERE id = StockID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCartDetailsByUserId` (IN `in_user_id` INT)   BEGIN
    SELECT 
        c.id,
        c.user_id,
        c.stock_id,
        c.qty,
        CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", cl.name, " ", sz.name) AS display_name,
        s.price,
        s.discount,
        s.price - s.discount AS new_price,
        s.cover,
        s.qty AS stock_qty,
        (SELECT COUNT(*) FROM cart WHERE user_id = in_user_id) AS total_count,
        (SELECT SUM((s.price - s.discount) * c.qty) FROM cart c JOIN stock s ON c.stock_id = s.id WHERE c.user_id = in_user_id) AS total_price,
        (s.price - s.discount) * c.qty AS total_amount,
        (SELECT c2.id
         FROM cart c2
         JOIN stock s2 ON c2.stock_id = s2.id
         WHERE c2.user_id = in_user_id AND c2.qty > s2.qty
         LIMIT 1) AS first_exceeds_stock
    FROM 
        cart c
    JOIN 
        stock s ON c.stock_id = s.id
    JOIN 
        product p ON s.product_id = p.id
    JOIN 
        type t ON s.type_id = t.id
    JOIN 
        gender g ON s.gender_id = g.id
    JOIN 
        color cl ON s.color_id = cl.id
    JOIN 
        size sz ON s.size_id = sz.id
    WHERE 
        c.user_id = in_user_id
    ORDER BY 
        c.added_date;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFiltersByProductID` (IN `id` INT)   BEGIN
    SELECT 
        GROUP_CONCAT(DISTINCT gender_id ORDER BY gender_id ASC) AS gender_ids,
        GROUP_CONCAT(DISTINCT color_id ORDER BY color_id ASC) AS color_ids,
        GROUP_CONCAT(DISTINCT type_id ORDER BY type_id ASC) AS type_ids,
        GROUP_CONCAT(DISTINCT size_id ORDER BY size_id ASC) AS size_ids
    FROM 
        stock
    WHERE 
        product_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNewArrivals` ()   BEGIN
    SELECT 
        s.id, 
        s.name,
        s.product_id,
        s.type_id,
        s.gender_id,
        s.color_id,
        s.size_id,
        s.qty,
        s.cover,
        s.price,
        s.discount,
        p.name AS product, 
        t.name AS type, 
        g.name AS gender, 
        c.name AS color, 
        sz.name AS size,
        CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) AS display_name,
        (s.price - s.discount) AS new_price,
        ROUND((s.discount / s.price * 100), 2) AS perc_discount
    FROM 
        stock s
    JOIN 
        product p ON s.product_id = p.id
    JOIN 
        type t ON s.type_id = t.id
    JOIN 
        gender g ON s.gender_id = g.id
    JOIN 
        color c ON s.color_id = c.id
    JOIN 
        size sz ON s.size_id = sz.id
    WHERE 
        s.qty > 0
    ORDER BY 
        s.updated_date DESC
    LIMIT 10;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPromotions` ()   BEGIN
    SELECT 
        s.id, 
        s.name,
        s.product_id,
        s.type_id,
        s.gender_id,
        s.color_id,
        s.size_id,
        s.qty,
        s.cover,
        s.price,
        s.discount,
        p.name AS product, 
        t.name AS type, 
        g.name AS gender, 
        c.name AS color, 
        sz.name AS size,
        CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) AS display_name,
        (s.price - s.discount) AS new_price,
        ROUND((s.discount / s.price * 100), 2) AS perc_discount
    FROM 
        stock s
    JOIN 
        product p ON s.product_id = p.id
    JOIN 
        type t ON s.type_id = t.id
    JOIN 
        gender g ON s.gender_id = g.id
    JOIN 
        color c ON s.color_id = c.id
    JOIN 
        size sz ON s.size_id = sz.id
    WHERE 
        s.discount > 0
        AND s.qty > 0
    ORDER BY 
        RAND()
    LIMIT 10;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRandom` ()   BEGIN
    SELECT 
        s.id, 
        s.name,
        s.product_id,
        s.type_id,
        s.gender_id,
        s.color_id,
        s.size_id,
        s.qty,
        s.cover,
        s.price,
        s.discount,
        p.name AS product, 
        t.name AS type, 
        g.name AS gender, 
        c.name AS color, 
        sz.name AS size,
        CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) AS display_name,
        (s.price - s.discount) AS new_price,
        ROUND((s.discount / s.price * 100), 2) AS perc_discount
    FROM 
        stock s
    JOIN 
        product p ON s.product_id = p.id
    JOIN 
        type t ON s.type_id = t.id
    JOIN 
        gender g ON s.gender_id = g.id
    JOIN 
        color c ON s.color_id = c.id
    JOIN 
        size sz ON s.size_id = sz.id
    WHERE 
        s.qty > 0
    ORDER BY 
        RAND()
    LIMIT 7;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStock` (IN `startRow` INT, IN `pageSize` INT, IN `type_ids` VARCHAR(100), IN `gender_ids` VARCHAR(100), IN `color_ids` VARCHAR(100), IN `size_ids` VARCHAR(100), IN `search_name` VARCHAR(100), IN `price_start` INT, IN `price_end` INT, IN `product_id` INT)   BEGIN
    SET @sql = CONCAT(
        'SELECT 
            s.id, 
            s.name,
            s.product_id,
            s.type_id,
            s.gender_id,
            s.color_id,
            s.size_id,
            s.qty,
            s.cover,
            s.price,
            s.discount,
            p.name AS product, 
            t.name AS type, 
            g.name AS gender, 
            c.name AS color, 
            sz.name AS size,
            CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) AS display_name,
        	(s.price - s.discount) AS new_price,
    		ROUND((s.discount / s.price * 100), 2) AS perc_discount
        FROM 
            stock s
        JOIN 
            product p ON s.product_id = p.id
        JOIN 
            type t ON s.type_id = t.id
        JOIN 
            gender g ON s.gender_id = g.id
        JOIN 
            color c ON s.color_id = c.id
        JOIN 
            size sz ON s.size_id = sz.id
        WHERE 1=1 ');

    IF product_id IS NOT NULL AND product_id != '' AND product_id != 0 THEN
        SET @sql = CONCAT(@sql, ' AND p.id = ', product_id);
    END IF;
    
    IF type_ids IS NOT NULL AND type_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.type_id IN (', type_ids, ')');
    END IF;
    IF gender_ids IS NOT NULL AND gender_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.gender_id IN (', gender_ids, ')');
    END IF;
    IF color_ids IS NOT NULL AND color_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.color_id IN (', color_ids, ')');
    END IF;
    IF size_ids IS NOT NULL AND size_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.size_id IN (', size_ids, ')');
    END IF;
    IF search_name IS NOT NULL AND search_name != '' THEN
        SET @sql = CONCAT(@sql, 
            ' AND CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) LIKE "%', search_name, '%"');
    END IF;
    IF price_start IS NOT NULL AND price_start != '' THEN
        SET @sql = CONCAT(@sql, ' AND (s.price - s.discount) >= ', price_start);
    END IF;
    IF price_end IS NOT NULL AND price_end != '' THEN
        SET @sql = CONCAT(@sql, ' AND (s.price - s.discount) <= ', price_end);
    END IF;
    
    SET @sql = CONCAT(@sql, ' ORDER BY added_date LIMIT ', startRow, ', ', pageSize);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStockByID` (IN `stock_id` INT)   BEGIN
    SELECT 
        s.*,               
        i.url AS image_url,
        au.name AS added_user_name,
        uu.name AS updated_user_name,
        CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) AS display_name,
        (s.price - s.discount) AS new_price,
    	ROUND((s.discount / s.price * 100), 2) AS perc_discount
    FROM 
        stock s
    LEFT JOIN 
        product p ON s.product_id = p.id
    LEFT JOIN 
        type t ON s.type_id = t.id
    LEFT JOIN 
        gender g ON s.gender_id = g.id
    LEFT JOIN 
        color c ON s.color_id = c.id
    LEFT JOIN 
        size sz ON s.size_id = sz.id
    LEFT JOIN 
        image i ON s.id = i.stock_id
    LEFT JOIN 
        user au ON s.added_user_id = au.id
    LEFT JOIN 
        user uu ON s.updated_user_id = uu.id
    WHERE 
        s.id = stock_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStockIdByFilters` (IN `color` INT, IN `gender` INT, IN `size` INT, IN `type` INT, IN `product` INT)   BEGIN
    SELECT id
    FROM stock
    WHERE color_id = color
      AND gender_id = gender
      AND size_id = size
      AND type_id = type
      AND product_id = product;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStockTotalCount` (IN `type_ids` VARCHAR(255), IN `gender_ids` VARCHAR(255), IN `color_ids` VARCHAR(255), IN `size_ids` VARCHAR(255), IN `search_name` VARCHAR(255), IN `price_start` DECIMAL(10,2), IN `price_end` DECIMAL(10,2))   BEGIN
    SET @sql = CONCAT(
        'SELECT COUNT(*) AS total_count
        FROM 
            stock s
        JOIN 
            product p ON s.product_id = p.id
        JOIN 
            type t ON s.type_id = t.id
        JOIN 
            gender g ON s.gender_id = g.id
        JOIN 
            color c ON s.color_id = c.id
        JOIN 
            size sz ON s.size_id = sz.id
        WHERE 1=1 ');

    IF type_ids IS NOT NULL AND type_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.type_id IN (', type_ids, ')');
    END IF;
    IF gender_ids IS NOT NULL AND gender_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.gender_id IN (', gender_ids, ')');
    END IF;
    IF color_ids IS NOT NULL AND color_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.color_id IN (', color_ids, ')');
    END IF;
    IF size_ids IS NOT NULL AND size_ids != '' THEN
        SET @sql = CONCAT(@sql, ' AND s.size_id IN (', size_ids, ')');
    END IF;
    IF search_name IS NOT NULL AND search_name != '' THEN
        SET @sql = CONCAT(@sql, 
            ' AND CONCAT(s.name, " ", p.name, " ", t.name, " ", g.name, " ", c.name, " ", sz.name) LIKE "%', search_name, '%"');
    END IF;
    IF price_start IS NOT NULL AND price_start != '' THEN
        SET @sql = CONCAT(@sql, ' AND (s.price - s.discount) >= ', price_start);
    END IF;
    IF price_end IS NOT NULL AND price_end != '' THEN
        SET @sql = CONCAT(@sql, ' AND (s.price - s.discount) <= ', price_end);
    END IF;
    
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertStock` (IN `name` VARCHAR(255), IN `product_id` INT, IN `type_id` INT, IN `gender_id` INT, IN `color_id` INT, IN `size_id` INT, IN `qty` INT, IN `cover` VARCHAR(255), IN `price` DECIMAL(8.2), IN `discount` DECIMAL(8.2), IN `other_images` JSON, IN `id` INT, IN `user_id` INT)   BEGIN
    -- Declare variables
    DECLARE i INT DEFAULT 0;
    DECLARE other_images_count INT;
    DECLARE current_other_image VARCHAR(255);

    DECLARE inserted_stock_id INT;
    
    DECLARE current_datetime DATETIME;
    
    SET current_datetime = NOW();

    IF id <> 0 THEN
        UPDATE stock
        SET name = name,
            product_id = product_id,
            type_id = type_id,
            gender_id = gender_id,
            color_id = color_id,
            size_id = size_id,
            qty = qty,
            cover = cover,
            price = price,
            discount = discount,
            updated_date = current_datetime,
            updated_user_id = user_id
        WHERE stock.id = id; 

        DELETE FROM image WHERE stock_id = id;

        SET inserted_stock_id = id;
    ELSE
        INSERT INTO stock (name, product_id, type_id, gender_id, color_id, size_id, qty, cover, price, discount, added_date, added_user_id, updated_date, updated_user_id)
        VALUES (name, product_id, type_id, gender_id, color_id, size_id, qty, cover, price, discount, current_datetime, user_id, current_datetime, user_id);

        SET inserted_stock_id = LAST_INSERT_ID();
    END IF;

    SET other_images_count = JSON_LENGTH(other_images);
    WHILE i < other_images_count DO
        SET current_other_image = JSON_UNQUOTE(JSON_EXTRACT(other_images, CONCAT('$[', i, ']')));
        INSERT INTO image (stock_id, url)
        VALUES (inserted_stock_id, current_other_image);

        SET i = i + 1;
    END WHILE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCartQty` (IN `in_cart_id` INT, IN `in_change_value` INT)   BEGIN
    DECLARE max_stock_qty INT;
    
	SELECT s.qty INTO max_stock_qty
    FROM cart c
    JOIN stock s ON c.stock_id = s.id
    WHERE c.id = in_cart_id;
    
    IF in_change_value > 0 THEN
        UPDATE cart
        SET qty = LEAST(qty + in_change_value, max_stock_qty)
        WHERE id = in_cart_id;
        
    ELSEIF in_change_value < 0 THEN
        UPDATE cart
        SET qty = GREATEST(1, qty + in_change_value)
        WHERE id = in_cart_id;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `card_detail`
--

CREATE TABLE `card_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `holder` varchar(100) NOT NULL,
  `number` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `cvv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `stock_id`, `qty`, `added_date`) VALUES
(177, 8, 70, 2, '2024-12-17 19:46:14'),
(179, 8, 75, 4, '2024-12-17 19:46:24'),
(182, 8, 72, 2, '2024-12-17 19:47:24'),
(184, 1, 80, 1, '2024-12-17 19:48:02'),
(185, 1, 86, 1, '2024-12-17 19:48:13');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(7, 'Casual Wear'),
(8, 'Formal Wear'),
(9, 'Outerwear'),
(10, 'Underwear'),
(11, 'Accessories'),
(12, 'Summer');

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `name`, `code`) VALUES
(1, 'Black', 'black'),
(2, 'White', 'white'),
(3, 'Pink', 'pink'),
(4, 'Red', 'red'),
(5, 'Orange', 'orange'),
(6, 'Yellow', 'yellow'),
(7, 'Green', 'green'),
(8, 'Blue', 'blue');

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`, `name`) VALUES
(4, 'Male'),
(5, 'Female'),
(6, 'Unisex');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `url` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `stock_id`, `url`) VALUES
(400, 75, '17344435648740.jpg'),
(401, 75, '17344435648751.jpg'),
(402, 75, '17344435648762.jpg'),
(403, 76, '17344436304560.jpg'),
(404, 76, '17344436304571.jpg'),
(405, 76, '17344436304592.jpg'),
(406, 77, '17344437151770.jpg'),
(407, 77, '17344437151791.jpg'),
(408, 77, '17344437151802.jpg'),
(409, 78, '17344437787470.jpg'),
(410, 78, '17344437787481.jpg'),
(411, 78, '17344437787502.jpg'),
(415, 84, '17344438843270.jpg'),
(416, 84, '17344438843301.jpg'),
(417, 84, '17344438843322.jpg'),
(418, 83, '17344439182730.jpg'),
(419, 83, '17344439182741.jpg'),
(420, 83, '17344439182742.jpg'),
(421, 85, '17344439574890.jpg'),
(422, 85, '17344439574901.jpg'),
(423, 85, '17344439574922.jpg'),
(424, 86, '17344440003220.jpg'),
(425, 86, '17344440003241.jpg'),
(426, 86, '17344440003262.jpg'),
(429, 67, '17344444927040.jpg'),
(430, 70, '17344445293480.jpg'),
(431, 72, '17344445570880.jpg'),
(432, 73, '17344445969120.jpg'),
(434, 79, '17344446684770.jpg'),
(439, 80, '17344447302250.jpg'),
(440, 81, '17344447533630.jpg'),
(441, 82, '17344447688350.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_header_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `reviewed` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_header`
--

CREATE TABLE `order_header` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sub_category_id`, `name`) VALUES
(6, 1, 'T-Shirt'),
(7, 1, 'Crop Top'),
(8, 1, 'Casual Blouse'),
(9, 1, 'Hoodie'),
(10, 1, 'Sweater'),
(11, 2, 'Jean'),
(12, 2, 'Casual Pant'),
(13, 2, 'Short'),
(14, 2, 'Casual Skirt');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `name` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `name`) VALUES
(1, 'M'),
(3, 'L'),
(4, 'XL'),
(5, 'XXL');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `cover` varchar(25) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `updated_date` datetime NOT NULL,
  `added_date` datetime NOT NULL,
  `added_user_id` int(11) NOT NULL,
  `updated_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `name`, `product_id`, `type_id`, `gender_id`, `color_id`, `size_id`, `qty`, `cover`, `price`, `discount`, `updated_date`, `added_date`, `added_user_id`, `updated_user_id`) VALUES
(67, '', 6, 1, 4, 1, 1, 15, '1734444492710.jpg', 3000.00, 0.00, '2024-12-17 19:38:16', '2024-11-09 22:10:42', 1, 1),
(70, '', 6, 1, 4, 1, 3, 15, '1734444523048.jpg', 3000.00, 0.00, '2024-12-17 19:38:53', '2024-11-09 22:13:53', 1, 1),
(72, '', 6, 1, 4, 2, 1, 15, '1734444552632.jpg', 3000.00, 0.00, '2024-12-17 19:39:19', '2024-11-09 22:14:43', 1, 1),
(73, '', 6, 1, 4, 2, 3, 15, '1734444592971.jpg', 3000.00, 0.00, '2024-12-17 19:39:59', '2024-11-09 22:15:18', 1, 1),
(75, '', 6, 1, 5, 1, 1, 15, '1734443564862.jpg', 3000.00, 0.00, '2024-12-17 19:23:16', '2024-11-09 22:18:14', 1, 1),
(76, '', 6, 1, 5, 1, 3, 15, '1734443620398.jpg', 3000.00, 0.00, '2024-12-17 19:23:53', '2024-11-09 22:18:54', 1, 1),
(77, '', 6, 1, 5, 2, 1, 15, '1734443709753.jpg', 3000.00, 0.00, '2024-12-17 19:25:35', '2024-11-09 22:19:24', 1, 1),
(78, '', 6, 1, 5, 2, 3, 15, '1734443773488.jpg', 3000.00, 0.00, '2024-12-17 19:26:38', '2024-11-09 22:19:57', 1, 1),
(79, '', 6, 2, 4, 1, 1, 10, '1734444668475.jpg', 2000.00, 500.00, '2024-12-17 19:41:12', '2024-11-09 22:21:36', 1, 1),
(80, '', 6, 2, 4, 1, 3, 10, '1734444723516.jpg', 2000.00, 500.00, '2024-12-17 19:42:17', '2024-11-09 22:22:12', 1, 1),
(81, '', 6, 2, 4, 2, 1, 10, '1734444748042.jpg', 2000.00, 500.00, '2024-12-17 19:42:35', '2024-11-09 22:22:55', 1, 1),
(82, '', 6, 2, 4, 2, 3, 10, '1734444764928.jpg', 2000.00, 500.00, '2024-12-17 19:42:50', '2024-11-09 22:23:34', 1, 1),
(83, '', 6, 2, 5, 1, 1, 10, '1734443918257.jpg', 2000.00, 500.00, '2024-12-17 19:28:41', '2024-11-09 22:24:15', 1, 1),
(84, '', 6, 2, 5, 1, 3, 10, '1734443878710.jpg', 2000.00, 500.00, '2024-12-17 19:28:32', '2024-11-09 22:24:41', 1, 1),
(85, '', 6, 2, 5, 2, 1, 10, '1734443952352.jpg', 2000.00, 500.00, '2024-12-17 19:29:30', '2024-11-09 22:27:02', 1, 1),
(86, '', 6, 2, 5, 2, 3, 10, '1734443993393.jpg', 2000.00, 500.00, '2024-12-17 19:30:12', '2024-11-09 22:27:28', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `category_id`, `name`) VALUES
(1, 7, 'Tops'),
(2, 7, 'Bottoms'),
(3, 7, 'Dresses'),
(4, 7, 'Loungewear'),
(5, 7, 'Activewear'),
(6, 7, 'Footwear'),
(7, 8, 'Formal Tops'),
(8, 8, 'Formal Bottoms'),
(9, 8, 'Dresses & Jumpsuits'),
(10, 8, 'Blazers & Suiting'),
(11, 8, 'Footwear'),
(12, 9, 'Jackets & Coats'),
(13, 9, 'Blazers & Vests'),
(14, 10, 'Bras & Bralettes'),
(15, 10, 'Bottoms'),
(16, 10, 'Sets'),
(17, 10, 'Shapewear'),
(18, 11, 'Bags & Backpacks'),
(19, 11, 'Hats & Scarves'),
(20, 12, 'Swimwear'),
(21, 12, 'Beach Accessories');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Cotton'),
(2, 'Linen'),
(3, 'Wool'),
(4, 'Silk'),
(5, 'Cashmere');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address_line_1` varchar(100) NOT NULL,
  `address_line_2` varchar(100) NOT NULL,
  `address_line_3` varchar(100) NOT NULL,
  `city` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role_id`, `name`, `address_line_1`, `address_line_2`, `address_line_3`, `city`, `phone`, `avatar`) VALUES
(1, 'admin@velvetvouge.com', '$2y$10$ydH69bCFLFfrTZtVOwt7KuMH3xdQXCRBRJk3vHroKl/TXIwdgjYLi', 1, 'Heshan Deshapriya', 'No. 551/11', 'Sangabo Mawatha', 'Malwatta', 'Nittambuwa', '0742252514', '1731171169858.jpg'),
(8, 'user@test.com', '$2y$10$ydH69bCFLFfrTZtVOwt7KuMH3xdQXCRBRJk3vHroKl/TXIwdgjYLi', 2, 'User(test)', 'test_address', 'test_address', 'test_address', 'test_city', '0123456789', '1731171169858.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card_detail`
--
ALTER TABLE `card_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`stock_id`),
  ADD KEY `cart_ibfk_2` (`stock_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_header_id` (`order_header_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_header`
--
ALTER TABLE `order_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_category_id` (`sub_category_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `rating_ibfk_2` (`stock_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `gender_id` (`gender_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `added_user_id` (`added_user_id`),
  ADD KEY `updated_user_id` (`updated_user_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card_detail`
--
ALTER TABLE `card_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=442;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_header`
--
ALTER TABLE `order_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `card_detail`
--
ALTER TABLE `card_detail`
  ADD CONSTRAINT `card_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_header_id`) REFERENCES `order_header` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `order_header`
--
ALTER TABLE `order_header`
  ADD CONSTRAINT `order_header_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `stock_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `stock_ibfk_4` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`),
  ADD CONSTRAINT `stock_ibfk_5` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  ADD CONSTRAINT `stock_ibfk_6` FOREIGN KEY (`added_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `stock_ibfk_7` FOREIGN KEY (`updated_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `sub_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
