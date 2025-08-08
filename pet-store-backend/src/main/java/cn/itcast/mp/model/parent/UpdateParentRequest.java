package cn.itcast.mp.model.parent;

import lombok.Data;

@Data
public class UpdateParentRequest {
    private int id;
    private String name;
    private String gender;
    private String breed;
    private String color;
    private String birthday;
    private String description;
    private String imgUrl;
}