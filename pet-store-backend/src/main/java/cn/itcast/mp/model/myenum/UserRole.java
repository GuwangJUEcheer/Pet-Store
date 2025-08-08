package cn.itcast.mp.model.myenum;

import lombok.Getter;

@Getter
public enum UserRole {
	ADMIN(0, "管理员"),
	VIP(1, "VIP用户"),
	NORMAL(2, "普通用户");

	private final int code;
	private final String description;

	UserRole(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public static UserRole fromCode(int code) {
		for (UserRole role : values()) {
			if (role.getCode() == code) {
				return role;
			}
		}
		throw new IllegalArgumentException("未知角色编号: " + code);
	}
}
