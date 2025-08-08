-- 数据库迁移脚本
-- 用于更新现有数据库以支持新的父母关系功能

-- Step 1: 创建父母表（如果不存在）
CREATE TABLE IF NOT EXISTS `parents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL CHECK (`gender` IN ('男の子', '女の子')),
  `color` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `description` text,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_gender` (`gender`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Step 2: 更新kittens表添加description字段（如果不存在）
ALTER TABLE `kittens` 
ADD COLUMN IF NOT EXISTS `description` text DEFAULT NULL AFTER `img_url`,
ADD COLUMN IF NOT EXISTS `created_at` timestamp DEFAULT CURRENT_TIMESTAMP AFTER `description`,
ADD COLUMN IF NOT EXISTS `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- Step 3: 检查并删除旧的kitten_parents表（如果存在且结构不匹配）
DROP TABLE IF EXISTS `kitten_parents_old`;

-- 如果旧表存在，先重命名保存数据
-- 注意：如果有重要数据，请手动迁移
-- RENAME TABLE `kitten_parents` TO `kitten_parents_old`;

-- Step 4: 创建新的小猫父母关系表
CREATE TABLE IF NOT EXISTS `kitten_parents` (
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

-- Step 5: 插入示例父母数据（仅在表为空时插入）
INSERT INTO `parents` (`name`, `gender`, `color`, `birthday`, `description`, `img_url`) 
SELECT * FROM (
    SELECT 'ミロ' as name, '男の子' as gender, 'ブラウン' as color, '2020-03-15' as birthday, 'オスの親猫です。とても優しい性格です。' as description, 'https://example.com/milo.jpg' as img_url
    UNION ALL
    SELECT 'サクラ', '女の子', 'クリーム', '2020-05-20', 'メスの親猫です。美しい毛色が特徴です。', 'https://example.com/sakura.jpg'
    UNION ALL
    SELECT 'タロウ', '男の子', 'シルバー', '2019-12-10', '経験豊富なオスの親猫です。', 'https://example.com/tarou.jpg'
    UNION ALL
    SELECT 'ハナ', '女の子', 'ピンク', '2021-01-05', '若いメスの親猫です。活発な性格です。', 'https://example.com/hana.jpg'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `parents`);

-- Step 6: 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS `idx_kittens_status` ON `kittens` (`status`);
CREATE INDEX IF NOT EXISTS `idx_kittens_gender` ON `kittens` (`gender`);
CREATE INDEX IF NOT EXISTS `idx_parents_name` ON `parents` (`name`);

-- Step 7: 数据验证查询（用于验证迁移是否成功）
-- 验证父母表
-- SELECT COUNT(*) as parent_count FROM `parents`;
-- SELECT gender, COUNT(*) as count FROM `parents` GROUP BY gender;

-- 验证小猫表
-- SELECT COUNT(*) as kitten_count FROM `kittens`;

-- 验证关系表
-- SELECT COUNT(*) as relation_count FROM `kitten_parents`;

COMMIT;