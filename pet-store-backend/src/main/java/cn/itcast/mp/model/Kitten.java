package cn.itcast.mp.model;

public class Kitten {
    private int id;
    private String name;
    private double price;
    private String gender;
    private String color;
    private String birthday;
    private String status;
    private String imgUrl;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
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

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
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
    
    @Override
    public String toString() {
        return "Kitten{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", gender='" + gender + '\'' +
                ", color='" + color + '\'' +
                ", birthday=" + birthday +
                ", status='" + status + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }

}
