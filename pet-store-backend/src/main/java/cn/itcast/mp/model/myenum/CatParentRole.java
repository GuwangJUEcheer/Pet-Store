package cn.itcast.mp.model.myenum;

import lombok.Getter;

@Getter
public enum CatParentRole {
	CAT_MOM("猫妈妈"),
	CAT_DAD("猫爸爸");

	private final String value;

	CatParentRole(String value) {
		this.value = value;
	}
}
