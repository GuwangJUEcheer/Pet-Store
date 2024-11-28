CREATE TABLE `kittens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `color` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `status` varchar(50) DEFAULT '予約受付中',
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;