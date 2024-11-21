CREATE TABLE `user` (
                        `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
                        `username` VARCHAR(255) NOT NULL COMMENT '用户名',
                        `password` VARCHAR(255) NOT NULL COMMENT '密码',
                        `jwt_token` VARCHAR(512) DEFAULT NULL COMMENT 'JWT令牌',
                        `is_login` BOOLEAN DEFAULT FALSE COMMENT '是否登录',
                        `is_locked` BOOLEAN DEFAULT FALSE COMMENT '是否锁定',
                        `role_id` INT DEFAULT NULL COMMENT '角色ID',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
