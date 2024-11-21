CREATE TABLE `user_role` (
                             `user_id` BIGINT NOT NULL COMMENT '用户ID',
                             `role_id` BIGINT NOT NULL COMMENT '角色ID',
                             `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关联创建时间',
                             PRIMARY KEY (`user_id`, `role_id`),
                             KEY `idx_role_id` (`role_id`),
                             CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                             CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- 给 John 分配 Admin 和 User 角色
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
                                                   (1, 1), -- John -> Admin
                                                   (1, 2); -- John -> User

-- 给 Jane 分配 User 角色
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
    (2, 2); -- Jane -> User
