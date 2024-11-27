package cn.itcast.mp.model;

public class Kitten {
    private Long id;
    private String img;
    private String name;
    private String price;
    private String breed;
    private String gender;
    private String color;
    private String birthday;

    // 无参构造函数
    public Kitten() {
    }

    // 带参数的构造函数
    public Kitten(Long id, String img, String name, String price, String breed, String gender, String color, String birthday) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
        this.breed = breed;
        this.gender = gender;
        this.color = color;
        this.birthday = birthday;
    }

    // Getter 和 Setter 方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
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
}
