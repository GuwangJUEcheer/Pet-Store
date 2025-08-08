package cn.itcast.mp.model;

import lombok.Data;

@Data
public class Kitten {
	private int id;
	private String name;
	private double price;
	private String gender;
	private String color;
	private String birthday;
	private String status;
	private String description;
	private String imgUrl;
	private int motherId;
	private int fatherId;
}
