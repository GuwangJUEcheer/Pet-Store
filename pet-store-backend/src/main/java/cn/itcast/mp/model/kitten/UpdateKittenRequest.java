package cn.itcast.mp.model.kitten;

import lombok.Data;

@Data
public class UpdateKittenRequest {
	private int id;
	private String name;
	private double price;
	private String gender;
	private String color;
	private String birthday;
	private String status;
	private String description;
	private String imgUrl;
	private int fatherId;
	private int motherId;
}
