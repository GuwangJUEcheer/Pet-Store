package cn.itcast.mp.model;

import java.util.Date;

public class Kitten {
    private Long id;            // 数据库中的主键
    private String name;        // 子猫的名称，对应数据库中的 `name`
    private String price;       // 子猫的价格，数据库中是 `decimal` 类型，转换为 String 处理
    private String gender;      // 子猫的性别
    private String color;       // 子猫的毛色
    private Date birthday;      // 子猫的生日，数据库中为 `date` 类型
    private String status;      // 子猫的状态，默认值为 `予約受付中`
    private String imgUrl;      // 子猫的图片路径，对应数据库中的 `img_url`

    // 无参构造函数
    public Kitten() {
        this.status = "予約受付中"; // 设置默认状态
    }

    // 带参构造函数
    public Kitten(Long id, String name, String price, String gender, String color, Date birthday, String status, String imgUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.gender = gender;
        this.color = color;
        this.birthday = birthday;
        this.status = status != null ? status : "予約受付中"; // 设置默认状态
        this.imgUrl = imgUrl;
    }

    // Getter 和 Setter 方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}

