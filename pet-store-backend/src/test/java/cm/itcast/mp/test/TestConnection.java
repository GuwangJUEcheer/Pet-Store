package cm.itcast.mp.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestConnection {
    private static final String JDBC_URL = "jdbc:mysql://localhost:3307/pet_store";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "1234567890";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
             Statement statement = connection.createStatement()) {

            String query = "SELECT * FROM kittens"; // 替换成你的表名
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                System.out.println("ID: " + resultSet.getInt("id"));
                System.out.println("Name: " + resultSet.getString("name"));
                System.out.println("-----------");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
