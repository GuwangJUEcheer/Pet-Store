package cn.itcast.mp.model;

import lombok.Data;

@Data
public class KittenParent {
	private Long id;
	private Long kittenId;
	private int parentId;
	private String parentRole; // "父" 或 "母"
	private String parentName; // 父母姓名（从Parent表关联获取）
	private String imgUrl; // 父母图片（从Parent表关联获取）
	private String description; // 父母描述（从Parent表关联获取）
}
