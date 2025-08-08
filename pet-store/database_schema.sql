-- 父母表
CREATE TABLE `pet-store-db`.parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender ENUM('父', '母') NOT NULL,
    breed VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    img_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 小猫-父母关系表
CREATE TABLE `pet-store-db`.kitten_parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kitten_id INT NOT NULL,
    parent_id INT NOT NULL,
    parent_role ENUM('父', '母') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kitten_id) REFERENCES kittens(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
    UNIQUE KEY unique_kitten_parent_role (kitten_id, parent_role)
);