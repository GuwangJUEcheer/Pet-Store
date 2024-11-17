package cn.itcast.mp.service;

import cn.itcast.mp.model.UserInfo;


public interface UserService {


	public UserInfo getUser(String UserId);
	
	public void UpdateUser(UserInfo user);
	
	public void addUser(UserInfo user);
	
	public UserInfo findUserByName(String UserName);
	
}
