/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `bank_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_number` varchar(20) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `money` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `totalAmount` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `phiShip` int DEFAULT NULL,
  `thoiGian` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `OrderProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `products_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_id` (`products_id`,`order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `OrderProduct_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `Product` (`products_id`) ON DELETE CASCADE,
  CONSTRAINT `OrderProduct_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Product` (
  `products_id` int NOT NULL AUTO_INCREMENT,
  `products_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `products_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `products_price` int DEFAULT NULL,
  `products_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `quantitySold` int DEFAULT '0',
  PRIMARY KEY (`products_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ProductComment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_fullname` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `ProductComment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `ProductComment_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`products_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fullname` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_birthDate` datetime DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `verification_code` varchar(6) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `user_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bank_accounts` (`id`, `account_number`, `account_name`, `bank_name`, `content`, `created_at`, `updated_at`, `money`) VALUES
(1, '123456789', 'Phan Ngọc Tài', 'Vietcombank', 'Thanh toán hóa đơn #001', '2024-11-21 03:35:55', '2024-11-29 17:13:37', 9216000);
INSERT INTO `bank_accounts` (`id`, `account_number`, `account_name`, `bank_name`, `content`, `created_at`, `updated_at`, `money`) VALUES
(2, '987654321', 'Nguyễn Văn An', 'Vietinbank', 'Thanh toán hóa đơn #002', '2024-11-21 03:35:55', '2024-11-21 05:52:07', 10000000);
INSERT INTO `bank_accounts` (`id`, `account_number`, `account_name`, `bank_name`, `content`, `created_at`, `updated_at`, `money`) VALUES
(3, '112233445', 'Trần Thị Bình', 'Techcombank', 'Thanh toán hóa đơn #003', '2024-11-21 03:35:55', '2024-11-21 05:52:07', 10000000);
INSERT INTO `bank_accounts` (`id`, `account_number`, `account_name`, `bank_name`, `content`, `created_at`, `updated_at`, `money`) VALUES
(4, '556677889', 'Lê Minh Cường', 'BIDV', 'Thanh toán hóa đơn #004', '2024-11-21 03:35:55', '2024-11-21 05:52:07', 10000000),
(5, '998877665', 'Phạm Thị Duyên', 'Agribank', 'Thanh toán hóa đơn #005', '2024-11-21 03:35:55', '2024-11-21 05:52:07', 10000000),
(6, '101010101', 'Nguyễn Hoàng Quý', 'MB Bank', 'Thanh toán hóa đơn #006', '2024-11-21 03:35:55', '2024-11-21 05:52:07', 10000000);

INSERT INTO `Order` (`order_id`, `totalAmount`, `status`, `phiShip`, `thoiGian`, `user_id`, `createdAt`, `address`) VALUES
(1, 39000, 'Đã thanh toán', 15000, '23 phút', 1, '2024-11-18 09:58:21', '123 Đường Hoàng Diệu, Phường Linh Trung, Thủ Đức, TP.HCM');
INSERT INTO `Order` (`order_id`, `totalAmount`, `status`, `phiShip`, `thoiGian`, `user_id`, `createdAt`, `address`) VALUES
(2, 69000, 'Đã thanh toán', 15000, '23 phút', 2, '2024-11-18 09:58:22', '123 Đường Hoàng Diệu, Phường Linh Trung, Thủ Đức, TP.HCM');
INSERT INTO `Order` (`order_id`, `totalAmount`, `status`, `phiShip`, `thoiGian`, `user_id`, `createdAt`, `address`) VALUES
(3, 386000, 'Đang giao hàng', 15000, '4 phút 3 giây', 1, '2024-11-21 05:53:50', '123 Đường Hoàng Diệu, Phường Linh Trung, Thủ Đức, TP.HCM');
INSERT INTO `Order` (`order_id`, `totalAmount`, `status`, `phiShip`, `thoiGian`, `user_id`, `createdAt`, `address`) VALUES
(4, 386000, 'Đang giao hàng', 15000, '5 phút 45 giây', 1, '2024-11-26 09:27:27', '36d Đường số 10, Phường Linh Xuân, Thủ Đức, TP.HCM'),
(6, 425000, 'Đang xử lí', 15000, '6 phút 49 giây', 12, '2024-11-26 14:36:20', '4568 Đường Hoàng Diệu, Phường Linh Trung, Thủ Đức, TP.HCM'),
(9, 0, 'Đã thanh toán', 25000, '9 phút 47 giây', 12, '2024-11-26 14:59:08', '123, Phường Hiệp Bình Phước, TP.Thủ Đức, TP.HCM'),
(10, 334000, 'Đã thanh toán', 10000, '0 phút 0 giây', 12, '2024-11-26 15:02:09', '123, Phường Long Hương, Thành phố Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu'),
(12, 79000, 'Đang xử lí', 10000, '4 phút 20 giây', 12, '2024-11-29 17:14:02', '123, Phường Linh Xuân, TP.Thủ Đức, TP.HCM');

INSERT INTO `OrderProduct` (`id`, `quantity`, `products_id`, `order_id`) VALUES
(1, 1, 1, 1);
INSERT INTO `OrderProduct` (`id`, `quantity`, `products_id`, `order_id`) VALUES
(2, 1, 2, 2);
INSERT INTO `OrderProduct` (`id`, `quantity`, `products_id`, `order_id`) VALUES
(15, 2, 3, 3);
INSERT INTO `OrderProduct` (`id`, `quantity`, `products_id`, `order_id`) VALUES
(16, 2, 5, 3),
(17, 2, 7, 3),
(24, 2, 3, 4),
(25, 2, 5, 4),
(26, 2, 7, 4),
(27, 2, 2, 6),
(28, 1, 5, 6),
(29, 3, 7, 6),
(30, 1, 1, 9),
(49, 2, 2, 10),
(50, 2, 3, 10),
(51, 2, 1, 10),
(52, 1, 2, 12);

INSERT INTO `Product` (`products_id`, `products_name`, `products_image`, `products_price`, `products_type`, `quantitySold`) VALUES
(1, 'C01 Mì tươi Gà xé', '//product.hstatic.net/200000892317/product/c01_c02_c21_c22_80bfcc18d1be43468950e56b0f517853_large.jpg', 39000, 'Mì', 104);
INSERT INTO `Product` (`products_id`, `products_name`, `products_image`, `products_price`, `products_type`, `quantitySold`) VALUES
(2, 'C02 Mì tươi Đùi gà xé', '//product.hstatic.net/200000892317/product/c01_c02_c21_c22_467b878e8a174f53996af406f7a278c1_large.jpg', 69000, 'Mì', 103);
INSERT INTO `Product` (`products_id`, `products_name`, `products_image`, `products_price`, `products_type`, `quantitySold`) VALUES
(3, 'C03 Mì tươi Cá', '//product.hstatic.net/200000892317/product/c03_c23_ec299dd19c67488094dfb4e1383bda1d_large.jpg', 59000, 'Mì', 106);
INSERT INTO `Product` (`products_id`, `products_name`, `products_image`, `products_price`, `products_type`, `quantitySold`) VALUES
(4, 'C04 Mì tươi Xá xíu', '//product.hstatic.net/200000892317/product/c04_c24_80c432275589428dbd9f7ac4c71c6195_large.jpg', 65000, 'Mì', 100),
(5, 'C05 Mì tươi Bò viên', '//product.hstatic.net/200000892317/product/c05_c25_4c246959518640d2aa6d86740395ecf1_large.jpg', 65000, 'Mì', 104),
(6, 'C06 Mì tươi Hoành thánh', '//product.hstatic.net/200000892317/product/c06_c26_b085ba0263d749cb8b44e6c1336811e3_large.jpg', 69000, 'Mì', 100),
(7, 'C07 Mì tươi Phá lấu', '//product.hstatic.net/200000892317/product/c07_c27_760c4f08ab074e1a9d504948b365d478_large.jpg', 69000, 'Mì', 104),
(8, 'C08 Mì tươi Tôm', '//product.hstatic.net/200000892317/product/c08_c28_acd0990a37d64ed49c552be898e65c6f_large.jpg', 69000, 'Mì', 100),
(9, 'C09 Mì tươi Bào ngư đặc biệt', '//product.hstatic.net/200000892317/product/c09_c29_c95807f9d0554bba81e020a6dc9974a3_large.jpg', 149000, 'Mì', 100),
(10, 'C10 Mì tươi Gà xé Xá xíu', '//product.hstatic.net/200000892317/product/c10_c11_c30_c31_15bfea7286a949eb80804791aa7c663e_large.jpg', 79000, 'Mì', 100),
(11, 'C11 Mì tươi Đùi gà xé Xá xíu', '//product.hstatic.net/200000892317/product/c10_c11_c30_c31_ac30d941c3674e0a9fee4554f8825d34_large.jpg', 89000, 'Mì', 100),
(12, 'C12 Mì tươi Gà xé Xá xíu sốt XO', '//product.hstatic.net/200000892317/product/c12_c13_bd3d1a062cb045f096a147389d0886d5_large.jpg', 89000, 'Mì', 100),
(13, 'C13 Mì tươi Đùi gà Xá xíu sốt XO', '//product.hstatic.net/200000892317/product/c12_c13_5997d5cf801d4c82bbdc6b3c0c5e57cb_large.jpg', 99000, 'Mì', 100),
(14, 'C14 Mì tươi Gà xé Bò viên', '//product.hstatic.net/200000892317/product/c14_c15_c32_c33_6120492e442341b6b45ff4be109983b9_large.jpg', 75000, 'Mì', 100),
(15, 'C15 Mì tươi Đùi gà Bò viên', '//product.hstatic.net/200000892317/product/c14_c15_c32_c33_03189a53c0bb46a5b7bb3c9869956753_large.jpg', 85000, 'Mì', 100),
(16, 'C16 Mì tươi Gà xé Hoành thánh', '//product.hstatic.net/200000892317/product/c16_c17_c34_c35_34f1d883815e438682b47fb607d94b01_large.jpg', 75000, 'Mì', 100),
(17, 'C17 Mì tươi Đùi gà Hoành thánh', '//product.hstatic.net/200000892317/product/c16_c17_c34_c35_e2bc3371ca0348f59bf129bed36b1b19_large.jpg', 85000, 'Mì', 100),
(18, 'C18 Mì tươi Gà xé Phá lấu', '//product.hstatic.net/200000892317/product/c18_c19_9a7670fac3c84b109da9aa0a6a8f82f0_large.jpg', 79000, 'Mì', 100),
(19, 'C19 Mì tươi Đùi gà Phá lấu', '//product.hstatic.net/200000892317/product/c18_c19_fdceff6374d5426bb0bcf4b4d6352865_large.jpg', 89000, 'Mì', 100),
(20, 'C20 Mì tươi Tôm Hoành thánh', '//product.hstatic.net/200000892317/product/c20_c38_905eb7f7b22844c39577e0f5d7056929_large.jpg', 75000, 'Mì', 100),
(21, 'C39 Thịt gà xé', '//product.hstatic.net/200000892317/product/c39_c40_92f330cd03fa42a7bffec9f1bae4f13f_large.jpg', 55000, 'Các món khác', 100),
(22, 'C40 Đùi gà xé', '//product.hstatic.net/200000892317/product/c39_c40_601360f2940340da8cc569cb45acad2a_large.jpg', 65000, 'Các món khác', 100),
(23, 'C41 Cá', '//product.hstatic.net/200000892317/product/c41_9f070c8e4cc64982b621111e31e8ef9d_large.jpg', 55000, 'Các món khác', 100),
(24, 'C42 Xá xíu', '//product.hstatic.net/200000892317/product/c42_4f0c5ab390794f01b577f537b764fcbf_large.jpg', 55000, 'Các món khác', 100),
(25, 'C43 Bò viên', '//product.hstatic.net/200000892317/product/c43_b864c2ad05c04f80ab651c2e3d7f7b8c_large.jpg', 55000, 'Các món khác', 100),
(26, 'C44 Phá lấu', '//product.hstatic.net/200000892317/product/c44_6d1d8751efb749fdb7b6798fa1976509_large.jpg', 60000, 'Phá lấu', 100),
(27, 'C45 Hoành thánh', '//product.hstatic.net/200000892317/product/c45_c55e8beda63b4fbf912edf1d68b15c34_large.jpg', 60000, 'Các món khác', 100),
(28, 'C46 Tôm', '//product.hstatic.net/200000892317/product/c46_676d098e0e5049ccaa95786281960495_large.jpg', 60000, 'Các món khác', 100),
(29, 'C47 Bào ngư', '//product.hstatic.net/200000892317/product/c47_0d11866adc85475aadfc1deb0e26b263_large.jpg', 99000, 'Các món khác', 100),
(30, 'C48 Mì thêm', '//product.hstatic.net/200000892317/product/c48_8696e6afbaee440c9cc4ce757ab6036c_large.jpg', 12000, 'Mì', 100),
(31, 'C50 Café Phin Đen', '//product.hstatic.net/200000892317/product/c50_e3f6347a084b4077b726ae423ba205ee_large.jpg', 20000, 'Nước giải khát', 100),
(32, 'C51 Café Phin sữa', '//product.hstatic.net/200000892317/product/c51_1bb86d9bd6dc4d109013a58b9bb34212_large.jpg', 25000, 'Nước giải khát', 100),
(33, 'C52 Coca', '//product.hstatic.net/200000892317/product/c52_8d31e6a6ea5d4fc196dc02368333e211_large.jpg', 15000, 'Nước giải khát', 100),
(34, 'C53 7up', '//product.hstatic.net/200000892317/product/c53_dfe75443efeb45bbba20ba818c27b939_large.jpg', 15000, 'Nước giải khát', 100),
(35, 'C54 Dasani', '//product.hstatic.net/200000892317/product/c54_1780cd4781694cb4b4bbb5166c5fe95b_large.jpg', 10000, 'Nước giải khát', 100),
(36, 'H01 Cơm Gà Hải Nam', '//product.hstatic.net/200000892317/product/h01_64a6f6854e94475782e4f4de9b7ac3b7_large.jpg', 39000, 'Cơm', 100),
(37, 'H02 Cơm Xá xíu', '//product.hstatic.net/200000892317/product/h02_5d16cbe40cf24ea68f613381d40f9559_large.jpg', 59000, 'Cơm', 100),
(38, 'H03 Cơm Phá lấu Thập Cẩm', '//product.hstatic.net/200000892317/product/h03_f3b17d9ca7f8470db3f6763af0665d8b_large.jpg', 69000, 'Cơm', 100),
(39, 'H06 Cơm Đùi gà', '//product.hstatic.net/200000892317/product/h06_56d7332d67b645c198dca9d9679f703f_large.jpg', 69000, 'Cơm', 100),
(40, 'H07 Cơm Gà xé nấm truffle', '//product.hstatic.net/200000892317/product/h07_e2f65fd306a94167af412dde88cc431d_large.jpg', 79000, 'Cơm', 100),
(41, 'H13 Cơm Gà Trứng phá lấu', '//product.hstatic.net/200000892317/product/h13_h15_0b0499a7627b40a5bcfa1419bbb8d8e5_large.jpg', 65000, 'Cơm', 100),
(42, 'H14 Cơm Xá xíu Trứng phá lấu', '//product.hstatic.net/200000892317/product/h14_39e1a5f7c5da436db89c5784af580590_large.jpg', 65000, 'Cơm', 100),
(43, 'H15 Cơm Đùi gà Trứng phá lấu', '//product.hstatic.net/200000892317/product/h13_h15_521af86bc0114553973424334e95ed18_large.jpg', 75000, 'Cơm', 100),
(44, 'H16 Cơm Phá lấu Thập cẩm Trứng', '//product.hstatic.net/200000892317/product/h16_2d633f7247bb48ffb66c1e9df4d668b5_large.jpg', 75000, 'Cơm', 100),
(45, 'H23 Cơm Gà Xá xíu Cải HK', '//product.hstatic.net/200000892317/product/h23_h24_2a457d2fcc9347d9825acd58a58a59de_large.jpg', 69000, 'Cơm', 100),
(46, 'H24 Cơm Đùi gà Xá xíu Cải HK', '//product.hstatic.net/200000892317/product/h23_h24_b7b53a6cc7d64fd69a58ca9a3290dd01_large.jpg', 79000, 'Cơm', 100),
(47, 'H25 Cơm Gà Phá lấu Cải HK', '//product.hstatic.net/200000892317/product/h25_h26_3c04e61c8a1a4948b450f687077ad3d4_large.jpg', 79000, 'Cơm', 100),
(48, 'H26 Cơm Đùi gà Phá lấu Cải HK', '//product.hstatic.net/200000892317/product/h25_h26_b8ae54494bb54182b72ed219f77b5380_large.jpg', 89000, 'Cơm', 100),
(49, 'H27 Cơm chiên Singapore', '//product.hstatic.net/200000892317/product/h27_3d44b9ba0d5e49889854c645ad0f1fe9_large.jpg', 65000, 'Cơm', 100),
(50, 'H28 Cơm chiên xanh gà xé', '//product.hstatic.net/200000892317/product/h28_0cf4a514e4db402aadb416d0ce52978f_large.jpg', 65000, 'Cơm', 100),
(51, 'H29 Cơm chiên xanh gà xé nấm truffle', '//product.hstatic.net/200000892317/product/h29_d0fe74a9010944d9bb297265a1914f6a_large.jpg', 89000, 'Cơm', 100),
(52, 'H30 Cơm chiên xanh Tôm', '//product.hstatic.net/200000892317/product/h30_75d08ab7ebdf4a15ae66a19d3a8eca78_large.jpg', 109000, 'Cơm', 100),
(53, 'H31 Cơm chiên Tôm sốt XO', '//product.hstatic.net/200000892317/product/h31_8c2ea56ad682482eb7ba0a204acda018_large.jpg', 129000, 'Cơm', 100),
(54, 'H32 Miến tay cầm Tôm', '//product.hstatic.net/200000892317/product/h32_9764b0b81f4a4d399c5641c70282e719_large.jpg', 109000, 'Miến', 100),
(55, 'H33 Miến tay cầm Tôm sốt XO', '//product.hstatic.net/200000892317/product/h33_00d48be0354047969289be589621cbde_large.jpg', 129000, 'Miến', 100),
(56, 'H34 Mì tươi Gà xé', '//product.hstatic.net/200000892317/product/h34_h39_67591a6bf44a43a99d476b95159732c0_large.jpg', 69000, 'Mì', 100),
(57, 'H35 Mì tươi Gà xé Xá xíu', '//product.hstatic.net/200000892317/product/h35_h40_f3c33f9f4d5640c58d0a586866e5b6f3_large.jpg', 79000, 'Mì', 100),
(58, 'H36 Mì tươi Gà xé Bò viên', '//product.hstatic.net/200000892317/product/h36_h41_fe5863fe80d241969e10fb259c768bf8_large.jpg', 79000, 'Mì', 100),
(59, 'H37 Mì tươi Gà xé Hoành thánh', '//product.hstatic.net/200000892317/product/h37_h42_374951ed7a894f28960c14e403515591_large.jpg', 79000, 'Mì', 100),
(60, 'H39 Mì tươi Đùi gà xé', '//product.hstatic.net/200000892317/product/h34_h39_f84fef4c0bd4465292945a9636085adb_large.jpg', 79000, 'Mì', 100),
(61, 'H40 Mì tươi Đùi gà xé Xá xíu', '//product.hstatic.net/200000892317/product/h35_h40_eed5f8d14e814b42bc9adf21657bab30_large.jpg', 89000, 'Mì', 100),
(62, 'H41 Mì tươi Đùi gà xé Bò viên', '//product.hstatic.net/200000892317/product/h36_h41_af1891bf941d438fbcc580838498a72e_large.jpg', 89000, 'Mì', 100),
(63, 'H42 Mì tươi Đùi gà xé Hoành thánh', '//product.hstatic.net/200000892317/product/h37_h42_3e0ec472a875414ab0ddb413ef53f517_large.jpg', 89000, 'Mì', 100),
(64, 'H44 Gà luộc nguyên con', '//product.hstatic.net/200000892317/product/h44_h45_bc681e1fea804bc2af8970bffae82f34_large.jpg', 399000, 'Các món khác', 100),
(65, 'H45 Gà luộc nửa con', '//product.hstatic.net/200000892317/product/h44_h45_f8d305e0eff14ff092d32bca4c8063e8_large.jpg', 199000, 'Các món khác', 100),
(66, 'H46 Đùi gà luộc góc tư', '//product.hstatic.net/200000892317/product/h46_fad683fe5a674df0b2107d2a51c87154_large.jpg', 99000, 'Các món khác', 100),
(67, 'H47 Xá xíu (200gr)', '//product.hstatic.net/200000892317/product/h47_9da819aea5904dbeb68c96be8abd96b3_large.jpg', 99000, 'Các món khác', 100),
(68, 'H48 Phá lấu thập cẩm (200gr)', '//product.hstatic.net/200000892317/product/h48_29aeeebb888141ac8c14153bcb38ef58_large.jpg', 109000, 'Phá lấu', 100),
(69, 'H49 Cải Hongkong xào dầu hào', '//product.hstatic.net/200000892317/product/h49_bc751a6982564676b3b3378afb3f8f12_large.jpg', 39000, 'Các món khác', 100),
(70, 'H50 Cải Hongkong xào tóp mỡ', '//product.hstatic.net/200000892317/product/h50_315430da2d7341dc9f09225c052e7e17_large.jpg', 39000, 'Các món khác', 100),
(71, 'H51 Cải bó xôi xào dầu hào', '//product.hstatic.net/200000892317/product/h51_b503d0b691b3402c90853a16bb9d4998_large.jpg', 39000, 'Các món khác', 100),
(72, 'H52 Cải bó xôi xào tóp mỡ', '//product.hstatic.net/200000892317/product/h52_a50770df79fe4505bff48a3cb00ffa21_large.jpg', 39000, 'Các món khác', 100),
(73, 'H53 Canh rong biển', '//product.hstatic.net/200000892317/product/h53_45a0ace3ed604d32aba14d6bdacfbeb4_large.jpg', 19000, 'Các món khác', 100),
(74, 'H54 Canh cải bó xôi', '//product.hstatic.net/200000892317/product/h54_3c0bf025deda467193435f6970e81d1c_large.jpg', 19000, 'Các món khác', 100),
(75, 'H58 Canh cá trứng bắc thảo', '//product.hstatic.net/200000892317/product/h58_5f33359e95df4fbaa353039b591487d5_large.jpg', 49000, 'Các món khác', 100),
(76, 'H59 Đùi gà', '//product.hstatic.net/200000892317/product/h59_65808760c6204aeeb37a033ac8b55f9f_large.jpg', 65000, 'Các món khác', 100),
(77, 'H60 Gà luộc', '//product.hstatic.net/200000892317/product/h60_506bd9375cf348c4b5d0182373fe1c45_large.jpg', 55000, 'Các món khác', 100),
(78, 'H61 Gà xé', '//product.hstatic.net/200000892317/product/h61_h62_b563439569944dfe9ef6e26d986472d8_large.jpg', 55000, 'Các món khác', 100),
(79, 'H62 Đùi gà xé', '//product.hstatic.net/200000892317/product/h61_h62_1eb3bfd5da7c4097869bb9f6e00a7ca6_large.jpg', 65000, 'Các món khác', 100),
(80, 'H63 Xá xíu', '//product.hstatic.net/200000892317/product/h63_09f8e437e35a4b739e348e5f313dec1f_large.jpg', 55000, 'Các món khác', 100),
(81, 'H64 Phá lấu Thập cẩm', '//product.hstatic.net/200000892317/product/h64_988a7c2609354cea922e36345f4dd465_large.jpg', 60000, 'Phá lấu', 100),
(82, 'H65 Phá lấu Bao tử', '//product.hstatic.net/200000892317/product/h65_4176eb2da80a424b9800310085a8a2b2_large.jpg', 70000, 'Phá lấu', 100),
(83, 'H66 Phá lấu Tai heo', '//product.hstatic.net/200000892317/product/h66_ec94017647a544ceb90e178a9c9c3299_large.jpg', 55000, 'Phá lấu', 100),
(84, 'H67 Trứng phá lấu (1/2)', '//product.hstatic.net/200000892317/product/h67_f79ac0ad0bd2474890d0fc833258f231_large.jpg', 5000, 'Các món khác', 100),
(85, 'H68 Hoành thánh', '//product.hstatic.net/200000892317/product/haochi-hoanh-thanh_59e4faedddb54bc4a15a255f2167d2ea_large.jpg', 55000, 'Các món khác', 100),
(86, 'H69 Bò viên', '//product.hstatic.net/200000892317/product/haochi-bo-vien_f488285dcf704790a31e2d5c2d88f4c3_large.jpg', 55000, 'Các món khác', 100),
(87, 'H75 Café Phin đen', '//product.hstatic.net/200000892317/product/h75_110610db0e7148a3a7ab0902191edb56_large.jpg', 20000, 'Nước giải khát', 100),
(88, 'H76 Café Phin sữa', '//product.hstatic.net/200000892317/product/h76_37c27ebaac6b44f09125aea64535bffa_large.jpg', 25000, 'Nước giải khát', 100),
(89, 'H77 Coca', '//product.hstatic.net/200000892317/product/h77_70a825c9a8fd4a6996cc641627d5104d_large.jpg', 15000, 'Nước giải khát', 100),
(90, 'H78 7up', '//product.hstatic.net/200000892317/product/h78_a445c53cf28141bcaf9e880cecfaab34_large.jpg', 15000, 'Nước giải khát', 100),
(91, 'H79 Dasani', '//product.hstatic.net/200000892317/product/h79_b9433fe1500641f8a7dc747dec923556_large.jpg', 10000, 'Nước giải khát', 100),
(92, 'H84 Cơm thêm', '//product.hstatic.net/200000892317/product/h68_e4cd7042d0524a11979d21d7ff57a2fe_large.jpg', 15000, 'Cơm', 100),
(93, 'H85 Mì thêm', '//product.hstatic.net/200000892317/product/h69_6b3fab3ea62b49ca96ff3737b576f595_large.jpg', 12000, 'Mì', 100),
(94, 'HC1 Combo Cơm Gà', '//product.hstatic.net/200000892317/product/hc1_26cf530699934c5884dd91f07492e75a_large.jpg', 69000, 'Combo', 100),
(95, 'HC2 Combo Cơm Xá xíu', '//product.hstatic.net/200000892317/product/hc2_2c6bfe50924d4745a14440d512f83dcf_large.jpg', 69000, 'Combo', 100),
(96, 'HC3 Combo Cơm gà & Canh hầm 1', '//product.hstatic.net/200000892317/product/hc3_7575c675f18441d99b8db71532c3fa41_large.jpg', 89000, 'Combo', 100),
(97, 'HC4 Combo Cơm gà & Canh hầm 2', '//product.hstatic.net/200000892317/product/hc4_dbe40acd1176465cb3cb468a1ee9f0d3_large.jpg', 89000, 'Combo', 100),
(98, 'HC5 Combo Cơm chiên Singapore', '//product.hstatic.net/200000892317/product/hc5_d0f748bffd9d48f5853697a79aeb26fe_large.jpg', 99000, 'Combo', 100),
(99, 'HC6 Combo Cơm chiên Xanh', '//product.hstatic.net/200000892317/product/hc6_9e67735e79734d3bb169e06ff3c887ad_large.jpg', 99000, 'Combo', 100),
(100, 'HC7 Combo Gia Đình', '//product.hstatic.net/200000892317/product/hc7_fe1b2495805b48cda1fe4498c59c55d9_large.jpg', 259000, 'Combo', 100),
(102, 'test1', 'http://localhost:8080/public/img/1732786597341_Screenshot_2024-11-28_153916.png', 30000, 'Mì', 100),
(105, 'test6', NULL, 10000, 'Nước giải khát', 0);

INSERT INTO `ProductComment` (`comment_id`, `user_id`, `product_id`, `user_fullname`, `content`, `created_at`) VALUES
(3, 1, 1, 'Phan Ngọc Tài', 'Sản phẩm rất tốt!', '2024-11-27 15:31:22');
INSERT INTO `ProductComment` (`comment_id`, `user_id`, `product_id`, `user_fullname`, `content`, `created_at`) VALUES
(5, 2, 2, 'Nguyễn Văn An', 'Ngonvl', '2024-11-27 15:53:18');


INSERT INTO `User` (`user_id`, `user_fullname`, `user_email`, `user_password`, `user_phone`, `user_birthDate`, `user_role`, `verification_code`, `is_verified`, `user_address`) VALUES
(1, 'Phan Ngọc Tài', '21130164@st.hcmuaf.edu.vn', 'User01@', '0901234567', '1990-01-01 00:00:00', 'admin', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM, Xã Hoà Long, Thành phố Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu');
INSERT INTO `User` (`user_id`, `user_fullname`, `user_email`, `user_password`, `user_phone`, `user_birthDate`, `user_role`, `verification_code`, `is_verified`, `user_address`) VALUES
(2, 'Nguyễn Văn An', '21130164@st.hcmuaf.edu.vn', 'User02@', '0902233445', '1992-02-02 00:00:00', 'user', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM');
INSERT INTO `User` (`user_id`, `user_fullname`, `user_email`, `user_password`, `user_phone`, `user_birthDate`, `user_role`, `verification_code`, `is_verified`, `user_address`) VALUES
(3, 'Trần Thị Bình', '21130164@st.hcmuaf.edu.vn', 'User03@', '0903234567', '1994-03-03 00:00:00', 'user', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM');
INSERT INTO `User` (`user_id`, `user_fullname`, `user_email`, `user_password`, `user_phone`, `user_birthDate`, `user_role`, `verification_code`, `is_verified`, `user_address`) VALUES
(4, 'Lê Minh Cường', '21130164@st.hcmuaf.edu.vn', 'User04@', '0904234567', '1988-04-04 00:00:00', 'user', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(5, 'Phạm Thị Duyên', '21130164@st.hcmuaf.edu.vn', 'User05@', '0905234567', '1996-05-05 00:00:00', 'user', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(9, 'Test', 'test1@gmail.com', '$2b$10$FX/QayIQ9HENDZ7xSb9I.eUqMp7cptQYmIwOiQZ/PE/umVKbonxA.', '123456789', '1990-01-01 00:00:00', 'admin', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(10, 'Test2', 'test2@gmail.com', '$2b$10$a7vzIYpTvYIdYk8aUsqnUulmqvdY4lZXPMM9waV4ZsyIdUQ6oZLJa', '98765432', '1990-01-01 00:00:00', 'user', NULL, 0, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(11, 'Test3', 'test3@gmail.com', '$2b$10$Cs1aTquxzSyT0XKSQQlPp.4GjEVGTcc1KJlxeYRlP6MHqD0H59epa', '9876432', '1990-01-01 00:00:00', 'user', NULL, 1, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(12, 'Admin', 'admin@gmail.com', '$2b$10$tcHrqIWiS2FgpCauZTHy2uBd2Y6FBgTE1yI/xmFvsKX0gK23lhHfy', '12345789', '1990-01-01 00:00:00', 'admin', NULL, 1, '456 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(13, 'Nguyễn Duy', 'abc@gmail.com', '$2b$10$eYHOT.wwYnuulTj1eFiCx.jkyq6fDAGh0lzKRujs3qFrbf.vEuN76', '1345678', '2024-11-11 17:00:00', 'user', NULL, 0, '123, Phường Linh Xuân, 769, 79'),
(14, 'Nguyễn Hoàng', 'xzc@gmail.com', '$2b$10$T49KIHf2l0/qGdBR.8Pd0eTOuTKUzFcYi7tJCitp8duyeNV5bgE1K', '1234567654345', '2024-11-19 17:00:00', 'user', '184999', 0, '123, Xã Kiến An, 893, 89'),
(16, 'Admin1', 'admin1@gmail.com', '$2b$10$7vE1BZgo6z.F4O4dsGBmsORKKdXkrtbxjb9EzcDrJjkxNBmD4SiW.', '12345789', '1990-01-01 00:00:00', 'admin', NULL, 1, '123 Đường Hoàng Diệu Phường Linh Trung Thủ Đức TP.HCM'),
(17, 'Dũng', 'dung@gmail.com', '$2b$10$20ksRNmmNuXgHE6FgiSYSOhcUdrtt8ThqvueFuHAe4zgI2i9YuzBK', '0849372949', '2024-11-27 17:00:00', 'user', NULL, 1, 'sffs fw'),
(18, 'Quý Hoang', 'quy1@gmail.com', '$2b$10$xOLyQf8AcgWidaV09l8wJ.RmfQgnVj9YDUeX.qmcii4yEUjCB4jKK', '22222222222', '2024-11-20 17:00:00', 'admin', NULL, 1, '12, Xã Hoà Long, Thành phố Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;