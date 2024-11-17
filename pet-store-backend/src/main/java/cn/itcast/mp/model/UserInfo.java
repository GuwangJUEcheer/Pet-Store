package cn.itcast.mp.model;

import java.io.Serializable;
import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserInfo implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	private String createTime;
	private String updateTime;
	private String username;
	private Integer age;
	private String telephone;
	private String email;
	private String sex;
	private String address;
	private String password;

	public UserInfo() {
		this.id = UUID.randomUUID().toString();
	}

	public UserInfo(//
			String id, //
			String createTime, //
			String updateTime, //
			String username, //
			Integer age, //
			String telephone, //
			String email, //
			String sex, //
			String address) {
		super();
		this.id = UUID.randomUUID().toString();
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.username = username;
		this.age = age;
		this.telephone = telephone;
		this.email = email;
		this.sex = sex;
		this.address = address;
	}
}
