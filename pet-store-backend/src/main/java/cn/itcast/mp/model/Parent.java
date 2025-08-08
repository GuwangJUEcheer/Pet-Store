package cn.itcast.mp.model;

import lombok.Data;

@Data
public class Parent {
    private int id;
    private String name;
    private String gender;
    private String breed;
    private String color;
    private String birthday;
    private String imgUrl;
    private String description;
    private String createdAt;
    private String updatedAt;
}