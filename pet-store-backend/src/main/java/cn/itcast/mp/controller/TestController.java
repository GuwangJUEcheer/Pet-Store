package cn.itcast.mp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public String testDatabaseConnection() {
        try {
            int rowCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM kittens", Integer.class);
            return "Database connected successfully! Total rows in table: " + rowCount;
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}
