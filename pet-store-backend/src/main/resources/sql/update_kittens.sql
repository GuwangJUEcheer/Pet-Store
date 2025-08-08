-- 更新kittens表结构，添加description字段
ALTER TABLE `kittens` ADD COLUMN `description` text DEFAULT NULL AFTER `img_url`;

-- 更新现有记录添加示例描述
UPDATE `kittens` SET `description` = '可愛い子猫です。' WHERE `description` IS NULL;