package cn.itcast.mp.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;

import cn.itcast.mp.mapper.UserMapper;
import cn.itcast.mp.model.UserInfo;
import cn.itcast.mp.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	
	//获得User对象 从Redis里面拿
	@Override
	@Cacheable(cacheNames="User",key="#userId")
	public UserInfo getUser(String userId) {
		if(StringUtils.isEmpty(userId)) {
			return null;
		}

		return userMapper.getUserById(userId);
	}

	@Override
	@CachePut(cacheNames="User",key="#name")
	public void UpdateUser(UserInfo user) {

		 userMapper.updateUser(user);
	}	
	
	public void addUser(UserInfo user) {
		
		userMapper.insertUser(user);
	}

	@Override
	@Cacheable(cacheNames="User",key="#name")
	public UserInfo findUserByName(String name) {
		// TODO Auto-generated method stub
		return userMapper.findUserByName(name);
	}
}
