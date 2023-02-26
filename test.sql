-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 26, 2023 lúc 11:56 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_getAccountId` (IN `id` INT)   BEGIN
  SELECT a.accountid,a.user_name,a.full_name,a.address,a.phone,a.email,a.role,a.status FROM account a WHERE a.accountid=id ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_dathang` (IN `accountid` INT, IN `productId` INT, IN `quantity` INT)   begin SET @OrderId=(SELECT MAX(op.orderid)+1 FROM order_product op);
    SET @date=(SELECT CURDATE());
    INSERT order_product VALUES(@OrderId,@date,0,accountid);
    INSERT order_detail VALUES(@OrderId,productId,quantity);
   end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_getOrder` ()   SELECT a.user_name, op.order_date,op.order_status FROM account a JOIN order_product op ON a.accountid = op.accountid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_hoadon` ()   SELECT p.product_name,op.order_date,op.order_status, od.order_quantity,p.product_price, p.product_price*od.order_quantity as'Tong tien'
FROM product p JOIN order_detail od ON p.productid = od.productid 
JOIN order_product op ON od.orderid = op.orderid JOIN account a ON op.accountid = a.accountid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_Top5` ()   BEGIN
SELECT p.product_name,p.product_image,p.product_price, SUM(od.order_quantity) FROM order_detail od JOIN product p ON od.productid = p.productid
GROUP BY p.product_name
ORDER BY SUM(od.order_quantity) DESC
LIMIT 5;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_xemhoadon` (IN `id` INT)   SELECT op.orderid,p.product_name,op.order_date,op.order_status, od.order_quantity,p.product_price
FROM product p JOIN order_detail od ON p.productid = od.productid 
JOIN order_product op ON od.orderid = op.orderid JOIN account a ON op.accountid = a.accountid
WHERE a.accountid=id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_deleteOrder` (IN `id` INT)   BEGIN
    DELETE FROM order_detail WHERE order_detail.orderid=id;
    DELETE FROM order_product WHERE order_product.orderid=id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `accountid` bigint(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`accountid`, `image`, `status`, `address`, `email`, `full_name`, `password`, `phone`, `role`, `user_name`) VALUES
(453, '', 1, '188/48B Hà Nội', 'nguyensong2k1@gmail.com', 'le huy dat', '$2a$10$Jh0MacBKThWzFRnwxf/yyep8DTbBwBTrOU4UKNcseXfBeen1mkwJ.', '0971825841', 'ADMIN', 'lehuydat'),
(802, '', 1, 'ha noi', 'sonnguyen2k1bg@gmail.com', 'le huy dat', '$2a$10$EWibGVgCyY5i20ePxMWRZ.wqhzuyw1NrayGqPVZ6k7ycYGyB4sPTq', '0971825841', 'USER', 'lehuydat'),
(902, '', 1, 'hiep hoa', 'nguyensong2353@gmail.com', 'nguyen van song', '$2a$10$WzHZJKsGfjnGLqykJnis6u4kPlOESupGHezE917yiRYQ6/hSYrVL.', '0971825841', 'ADMIN', 'nguyenvansong'),
(952, '', 1, 'hiep hoa', 'song@gmail.com', 'nguyen thi nga', '$2a$10$SCM.7slIpMyh6Y710WdLtecB5aVDSfz9pVoIDsJlwS3YKuklEd/3K', '0971825841', 'USER', 'nguyenthinga');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account_seq`
--

CREATE TABLE `account_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account_seq`
--

INSERT INTO `account_seq` (`next_val`) VALUES
(1051);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `brand_id` bigint(20) NOT NULL,
  `brand_image` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_image`, `brand_name`) VALUES
(6, 'laptop.jpg', 'laptop acer'),
(7, 'laptop.jpg', 'laptop asus'),
(8, 'laptop.jpg', 'laptop dell'),
(9, 'laptop.jpg', 'laptop hp'),
(10, 'bd9da142b16f401f2b16089a33483f08.jfif', 'CANDY'),
(11, '727ae5fe3d9226aeee8281ef209e06aa.jfif', 'Ajazz'),
(12, '47a0a826776f68f068e16fb62e591b8b.jfif', 'MSI'),
(13, '29cc4b0340ca3c2e0ec2cb7fcb5227f2.jfif', 'Taobao'),
(14, 'sg-11134201-22110-ild4q3r4tgkvca.jfif', 'White');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `categoryid` bigint(20) NOT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`categoryid`, `category_image`, `category_name`) VALUES
(4, 'banphim.jpg', 'Bàn phím'),
(5, 'laptop01.jpg', 'Laptop'),
(6, 'ram.jpg', 'Linh kiện'),
(7, 'tainghe.png', 'Tai nghe'),
(8, 'chuot.jpg', 'Chuột');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image` (
  `imageid` bigint(20) NOT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `productid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `image`
--

INSERT INTO `image` (`imageid`, `image_name`, `productid`) VALUES
(2, 'acer-swift-7-sf714-52t-laptop-1-510x510-1.jpg', 6),
(3, 'acer-predator-helios-300-ph315-51-7533-gaming-laptop-510x510-1.jpg', 6),
(4, 'asus-proart-studiobook-pro-x-w730g2t-h8007t-laptop-0-510x510-1.jpg', 6),
(5, 'asus-rog-strix-g-g531gd-al025t-laptop-510x510-1.jpg', 6),
(6, '037bf3bf3961f48d004be375bfdb07fb.jfif', 1),
(7, '2f574b926d6a015a38218ebf051f19ac.jfif', 1),
(8, '225e8abf224fcf288373dd36d7d430ac.jfif', 1),
(9, '82187b55b776e5a9de9f08345e74ee1c.jfif', 1),
(10, 'sg-11134201-22110-ig5vcgo18gkvaf.jfif', 7),
(11, 'sg-11134201-22110-sf7bf5n18gkvce.jfif', 7),
(12, 'sg-11134201-22110-ydur9jo18gkvff.jfif', 7),
(13, 'sg-11134201-22110-ytqzsfo18gkvc5.jfif', 7),
(14, '5cc8f9e7401d611778ebf44eece091d6.jfif', 8),
(15, '51f235db14670f6e044f0646b6e6ac73.jfif', 8),
(16, '89d8d2a82ebfb71fa64ba88e8ec00a94.jfif', 8),
(17, 'fc1e45644e9899c072596d47c5c11fbe.jfif', 8),
(18, 'sg-11134201-23010-2jksw070gumvf3.jfif', 9),
(19, 'sg-11134201-23010-gkobmtfahumv94.jfif', 9),
(20, 'vn-11134207-23010-5mxwnwo2n5lv6f.jfif', 9),
(21, 'vn-11134207-23010-8o5i46o2n5lvcb.jfif', 9),
(22, '4f4bd673df54f1d6e720076c1c23e570.jfif', 10),
(23, 'sg-11134201-22110-6c1qshfuy0jva5.jfif', 10),
(24, 'sg-11134201-22110-bk9c7lmuy0jvb8.jfif', 10),
(25, 'sg-11134201-22110-bzyqv7lty0jvf4.jfif', 10),
(26, '17bc7a9744eb5fcf36a6c4d0ce4579e9.jfif', 11),
(27, '6554d518ef221c3ab5ba7286c9ca8e7c.jfif', 11),
(28, 'd6bb72333118eea373fd684372ba8dc2.jfif', 11),
(29, 'd17793f6fcfcbf54df2766d562691caa.jfif', 11),
(30, 'sg-11134201-23020-2vtrvf1cm8mvcb.jfif', 12),
(31, 'sg-11134201-23020-5z2zshgcm8mvc9.jfif', 12),
(32, 'sg-11134201-23020-h2lqpg1cm8mva2.jfif', 12),
(33, 'sg-11134201-23020-y7msbf1cm8mv44.jfif', 12),
(34, 'sg-11134201-23020-h2lqpg1cm8mva2.jfif', 13),
(35, 'sg-11134201-23020-5z2zshgcm8mvc9.jfif', 13),
(36, 'sg-11134201-23020-2vtrvf1cm8mvcb.jfif', 13),
(37, 'sg-11134201-23020-y7msbf1cm8mv44.jfif', 13),
(38, '4ae2190396e240b035f16975a6213d7d.jfif', 14),
(39, '71a4e1516f0dae5949f3c7f8c5549879.jfif', 14),
(40, 'e6ef21eca81ec081693c151d63dae988.jfif', 14),
(41, 'sg-11134201-22100-744i8d4v7iivff.jfif', 14),
(42, '6a9a038316fc73198ef6257c0ce10967.jfif', 15),
(43, '65cd5aa1dc464f322beddf2476542fef.jfif', 15),
(44, '98f005ab5d5df93e6e5b670004b9a601.jfif', 15),
(45, 'd484033e621d0600961ec3559174819c.jfif', 15),
(46, '40a975da25ca4f9cd40e008469ee1234.jfif', 16),
(47, 'a74db838f10e54b278343e38e5e364a8.jfif', 16),
(48, 'df7f206979ef7ace09aaacce31dd6009.jfif', 16),
(49, 'e0c2d35641bb2f4093ba6a15cccaf3f3.jfif', 16),
(51, '03fe55fb68b8d2950deeef78548ac924.jfif', 17),
(52, '78b1225967c6bd2ae126e3f218bf3189.jfif', 17),
(53, '727ae5fe3d9226aeee8281ef209e06aa.jfif', 17),
(54, 'b329eac10448bfb070cebd665f12dc39.jfif', 17),
(55, 'f8e9cc51d9a1d2816f622067a17b4d19.jfif', 18),
(56, '0aba680053f26235f0f669c9833215c7.jfif', 18),
(57, 'be3c0da1df938c8606168eaf087e7df5.jfif', 18),
(58, 'sg-11134201-22120-ok46e0lxuqkv5a.jfif', 18),
(59, '04adf3a7b04445955ef5e22df7deb23a.jfif', 19),
(60, 'c797e24c07252c848da5017d73488752.jfif', 19),
(61, 'ec5033f329a641afa614eb0e2938ba95.jfif', 19),
(62, 'eee0ebd1a7dd9d57fbf4dc4d484346ba.jfif', 19),
(69, '7af7cb88f4accde5a448d1d751baeaf8.jfif', 25),
(70, '64d0a80d60192db2267febb126dbad0e.jfif', 25),
(71, 'dcd6720923dab1e225ca8090e20d31a4.jfif', 25),
(72, 'sg-11134201-22110-ild4q3r4tgkvca.jfif', 25);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `orderid` bigint(20) NOT NULL,
  `productid` bigint(20) NOT NULL,
  `order_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`orderid`, `productid`, `order_quantity`) VALUES
(28, 6, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_product`
--

CREATE TABLE `order_product` (
  `orderid` bigint(20) NOT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` int(11) DEFAULT NULL,
  `accountid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_product`
--

INSERT INTO `order_product` (`orderid`, `order_date`, `order_status`, `accountid`) VALUES
(27, '2023-02-20', 0, 453),
(28, '2023-02-23', 0, 453);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `productid` bigint(20) NOT NULL,
  `discount` double DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `product_created` date DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `brandid` bigint(20) DEFAULT NULL,
  `categoryid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`productid`, `discount`, `product_price`, `product_created`, `product_description`, `product_image`, `product_name`, `brandid`, `categoryid`) VALUES
(1, 10, 35600000, NULL, 'Mainboard: HP Chipset Q87 – 4 Khe Ram\r\nCPU: Intel® Xeon® Processor Core I5\r\nTản Nhiệt Khí: HP 800 G1 Tiêu Chuẩn\r\nRAM: 8GB DDR3 1600Mhz\r\nỔ cứng: SSD 128G + HDD 1TB NEW\r\nCard đồ họa: NVIDIA Geforce GTX 1650 4G DDR5 128bit 896 CUDA Core', 'Acer-Predator-Helios-300-PH315-52-Gaming-Laptop-1.jpg', 'Acer Predator Helios 300 PH315-52-78HH Gaming Laptop', 6, 5),
(6, 10, 49600000, '2023-02-08', 'Mainboard: HP Chipset Q87 – 4 Khe Ram\r\nCPU: Intel® Xeon® Processor Core I5\r\nTản Nhiệt Khí: HP 800 G1 Tiêu Chuẩn\r\nRAM: 8GB DDR3 1600Mhz\r\nỔ cứng: SSD 128G + HDD 1TB NEW\r\nCard đồ họa: NVIDIA Geforce GTX 1650 4G DDR5 128bit 896 CUDA Core', 'acer-swift-7-sf714-52t-laptop-1-510x510-1.jpg', 'Acer Swift 7 SF714-52T-7134 Laptop – Black', 6, 5),
(7, 5, 45600000, NULL, 'Mainboard: HP Chipset Q87 – 4 Khe Ram\r\nCPU: Intel® Xeon® Processor Core I5\r\nTản Nhiệt Khí: HP 800 G1 Tiêu Chuẩn\r\nRAM: 8GB DDR3 1600Mhz\r\nỔ cứng: SSD 128G + HDD 1TB NEW\r\nCard đồ họa: NVIDIA Geforce GTX 1650 4G DDR5 128bit 896 CUDA Core', 'asus-proart-studiobook-pro-17-w700g1t-laptop-1-510x510-1.jpg', 'ASUS ProArt StudioBook Pro 17 W700G1T-AV046T Laptop', 7, 5),
(8, 6, 44600000, '2023-02-17', 'Mainboard: HP Chipset Q87 – 4 Khe Ram\r\nCPU: Intel® Xeon® Processor Core I5\r\nTản Nhiệt Khí: HP 800 G1 Tiêu Chuẩn\r\nRAM: 8GB DDR3 1600Mhz\r\nỔ cứng: SSD 128G + HDD 1TB NEW\r\nCard đồ họa: NVIDIA Geforce GTX 1650 4G DDR5 128bit 896 CUDA Core', 'asus-rog-strix-scar-iii-laptop-1-510x510-1.jpg', 'ASUS ROG Strix SCAR III G531GN-VAZ160T Laptop', 7, 5),
(9, 0, 15000000, '2023-02-17', 'Nằm trong dòng laptop văn phòng, chiếc laptop Asus Vivobook Ryzen 7 - Asus FL8850UA rất được nhiều người dùng đánh giá cao về hiệu năng.', '6703_fl8850ua_moi.jpg', '[New 100%] Laptop Asus FL8850UA 90NB0U12-M01790 - AMD Ryzen 7', 7, 5),
(10, 12, 16490000, '2023-02-17', 'Chiếc laptop/máy tính xách tay Asus TUF Gaming FX506LH HN188W là sản phẩm laptop gaming giá rẻ ấn tượng của hãng laptop Asus.', '6925__m___i_100__full_box__laptop_asus_tuf_gaming_f15_fx506lh_hn188w___intel_core_i5.png', '[New 100%] Laptop Asus TUF Gaming F15 FX506LHB-HN188W - Intel Core i5', 7, 5),
(11, 0, 41900000, '2023-02-03', 'Asus ROG Strix G533ZX-XS96 - Cỗ máy chiến game siêu mạnh mẽ - Cấu hình KHỦNG với chip i9 Gen 12 - Card RTX 3080 Ti - Màn hình 240Hz chất lượng cao', '7565_6.jpg', '[New 100%] Laptop Asus ROG Strix G533ZX-XS96 - Intel Core i9 - 12900H | RTX 3080Ti 16GB | 15.6 Inch QHD', 7, 5),
(12, 0, 10990000, '2023-02-13', 'Dell Inspiron 3505\r\nCứng cáp, siêu bền - Màn cảm ứng sắc nét \r\n Combo AMD cực khỏe - Đồ họa 2D, chơi LOL mượt', '6616_ac_m___i_100__full_box_laptop_dell_inspiron_3505_0m1t4_amd_ryzen_5__5_.jpg', '[New 100%] Laptop Dell Inspiron 3505-0M1T4 - AMD Ryzen 5', 8, 5),
(13, 0, 16990000, '2023-02-06', 'Dell Inspiron 3525 - Cấu hình khủng nhất tầm giá - Siêu bền', '7316_7845_ac_new_oulet_laptop_dell_inspiron_3525_4mp3r_amd_ryzen_7_mx550_2__2_.jpg', '[New Oulet] Laptop Dell Inspiron 3525-4MP3R - AMD Ryzen 7 | MX550', 8, 5),
(14, 0, 11990000, '2023-02-17', 'HP Pavilion i3 x360 2022 RẺ NHẤT - Chip gen 12 đời mới nhất khỏe chơi game, đồ họa mượt - Sang trọng, bền bỉ', '7719_ac_m___i_100__full_box_laptop_hp_pavilion_x360_14_ek0013dx_intel_core.jpg', '[New 100%] Laptop HP Pavilion x360 14-ek0013dx - Intel Core i3 - 1215U | 14 Inch Full HD [2022]', 9, 5),
(15, 9, 690000, '2023-02-17', '👏🏻Bàn phím thiết kế tinh tế, phím bấm êm ái với keycap Circle độc đáo\r\n👏🏻Chuột thiết kế đối xứng hoàn toàn phù hợp với cả người dùng thuận tay phải hoặc tay trái, đem lại cảm giác thoải mái khi sử dụng.', 'bd9da142b16f401f2b16089a33483f08.jfif', 'BỘ PHÍM CHUỘT KHÔNG DÂY MOFII CANDY ĐA MÀU SẮC', 10, 4),
(16, 0, 579000, '2023-02-17', 'Bộ bàn phím không dây & chuột MO.Fll Candy Basic (phím giả cơ) không dây thế hệ mới với ưu điểm thiết kế đẹp mắt, hiện đại, kết nối ổn định với wireless 2.4G và siêu tiết kiệm pin.', '9b76f7fd0053cbb40fb9edb9141bdfc1.jfif', 'Bộ bàn phím không dây giả cơ & chuột MOFll Candy/Mini Basic', 10, 4),
(17, 12, 439000, '2023-02-17', 'Thiết kế màu tuyệt đẹp: Mỗi bàn phím là thiết kế nhiều màu sắc khiến bạn trở nên độc đáo trong văn phòng.\r\nThiết kế phím cổ điển và phong cách thanh lịch kết hợp độc đáo các màu sắc mang lại cho bạn phong cách riêng biệt', '727ae5fe3d9226aeee8281ef209e06aa.jfif', 'Bàn phím bluetooth Ajazz 308i thiết kế 84 phím tròn mini cực kì nhỏ gọn tiện lợi kết nối PC,Laptop,ĐT,tablet táo', 11, 4),
(18, 13, 3750000, '2023-02-17', 'Sản phẩm chính hãng MSI Việt Nam\r\nHàng Fullbox bảo hành 36T', '47a0a826776f68f068e16fb62e591b8b.jfif', 'MAINBOARD bo mạch chủ MSI MAG B660M MORTAR DDR4 chính hãng', 12, 6),
(19, 15, 295000, '2023-02-17', 'Tên sản phẩm : Headphone gaming mèo có dây sử dụng điện thoại máy tính đa nền tảng\r\n* Công ty nhập khẩu và phân phối : Bearhome', '29cc4b0340ca3c2e0ec2cb7fcb5227f2.jfif', 'Tai Nghe Gaming Chụp Tai Tai Mèo Có Dây, Có Micro Và Đèn Led Chân Mèo.', 13, 7),
(25, 20, 58800, '2023-02-22', 'Đặc trưng:\r\n  DPI có thể điều chỉnh: 1000DPI\r\n  Kết nối: USB2.0\r\n  Kích thước sản phẩm: xấp xỉ 127 * 78 * 38mm / 5 * 3.07 * 1.49 \'\'', '7af7cb88f4accde5a448d1d751baeaf8.jfif', 'Chuột Gaming White Siêu Bền-Chuột Chơi Game Có Dây 1200 Dpi Kèm Đèn Led Nền', 14, 8);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountid`);

--
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryid`);

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`imageid`),
  ADD KEY `FKn94cafwqqcc72bp2qa8agd5xb` (`productid`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`orderid`,`productid`),
  ADD KEY `FKlsvx45m4io6a6fdwpa14pvn92` (`productid`);

--
-- Chỉ mục cho bảng `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `FKoe14wwt9yq4ad4hkgclnn4otf` (`accountid`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productid`),
  ADD KEY `FKbjg13m30ju2y2g5icqbuycglv` (`brandid`),
  ADD KEY `FK4ort9abhumpx4t2mlngljr1vi` (`categoryid`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `brand_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `categoryid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `image`
--
ALTER TABLE `image`
  MODIFY `imageid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT cho bảng `order_product`
--
ALTER TABLE `order_product`
  MODIFY `orderid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `productid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FKn94cafwqqcc72bp2qa8agd5xb` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`);

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `FK6nh5x4no34o5vq1ocrtlgdcx8` FOREIGN KEY (`orderid`) REFERENCES `order_product` (`orderid`),
  ADD CONSTRAINT `FKlsvx45m4io6a6fdwpa14pvn92` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`);

--
-- Các ràng buộc cho bảng `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `FKoe14wwt9yq4ad4hkgclnn4otf` FOREIGN KEY (`accountid`) REFERENCES `account` (`accountid`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK4ort9abhumpx4t2mlngljr1vi` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`),
  ADD CONSTRAINT `FKbjg13m30ju2y2g5icqbuycglv` FOREIGN KEY (`brandid`) REFERENCES `brand` (`brand_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
