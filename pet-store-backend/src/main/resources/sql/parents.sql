-- 创建父母表
CREATE TABLE `parents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL CHECK (`gender` IN ('男の子', '女の子')),
  `color` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `description` text,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建小猫父母关系表
CREATE TABLE `kitten_parents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kitten_id` bigint NOT NULL,
  `parent_id` bigint NOT NULL,
  `parent_role` varchar(10) NOT NULL CHECK (`parent_role` IN ('父', '母')),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_kitten_role` (`kitten_id`, `parent_role`),
  KEY `idx_kitten_id` (`kitten_id`),
  KEY `idx_parent_id` (`parent_id`),
  CONSTRAINT `fk_kitten_parents_kitten` FOREIGN KEY (`kitten_id`) REFERENCES `kittens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_kitten_parents_parent` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 插入一些示例父母数据
INSERT INTO `parents` (`name`, `gender`, `color`, `birthday`, `description`, `img_url`) VALUES
('ミロ', '男の子', 'ブラウン', '2020-03-15', 'オスの親猫です。とても優しい性格です。', 'https://example.com/milo.jpg'),
('サクラ', '女の子', 'クリーム', '2020-05-20', 'メスの親猫です。美しい毛色が特徴です。', 'https://example.com/sakura.jpg'),
('タロウ', '男の子', 'シルバー', '2019-12-10', '経験豊富なオスの親猫です。', 'https://example.com/tarou.jpg'),
('ハナ', '女の子', 'ピンク', '2021-01-05', '若いメスの親猫です。活発な性格です。', 'https://example.com/hana.jpg');