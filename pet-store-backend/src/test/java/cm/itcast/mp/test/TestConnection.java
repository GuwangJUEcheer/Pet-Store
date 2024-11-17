package cm.itcast.mp.test;
import java.sql.Connection;
import java.sql.DriverManager;

public class TestConnection {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // 加载驱动
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/pet-store-db", "root", "Google!123");
            System.out.println("连接成功！");
        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}