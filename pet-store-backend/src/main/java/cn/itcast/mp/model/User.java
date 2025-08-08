package cn.itcast.mp.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户表
 *
 * @TableName user
 */
@Data
public class User implements Serializable {

	/**
	 * 用户ID
	 */
	private Integer id;

	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 密码
	 */
	private String password;

	/**
	 * JWT令牌
	 */
	private String jwtToken;

	/**
	 * 是否登录
	 */
	private Integer isLogin;

	/**
	 * 是否锁定
	 */
	private Integer isLocked;

	/**
	 * 角色ID
	 */
	private Integer roleId;

}
