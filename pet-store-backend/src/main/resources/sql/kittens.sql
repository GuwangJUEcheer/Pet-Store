CREATE TABLE kittens (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    gender ENUM('男の子', '女の子') NOT NULL,
    color VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    status ENUM('予約受付中', '予約済み') NOT NULL DEFAULT '予約受付中',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
