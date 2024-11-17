package cn.itcast.mp.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alibaba.druid.util.StringUtils;

import cn.itcast.mp.model.LoginResponse;
import cn.itcast.mp.model.LoginResponse.LoginResult;
import cn.itcast.mp.model.UserInfo;
import cn.itcast.mp.service.TokenService;
import cn.itcast.mp.service.UserService;
import cn.itcast.mp.utils.DateUtils;
@RestController
@RequestMapping("/")
@ResponseBody
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public LoginResponse login(@RequestBody Map<String, String> credentials) {
		String userName = credentials.get("userName");
		String password = credentials.get("password");
		LoginResponse response = new LoginResponse();

		if (StringUtils.isEmpty(userName) || StringUtils.isEmpty(password)) {
			response.setLoginResult(LoginResult.NG.name());
			return response;
		}

		UserInfo user = userService.findUserByName(userName);
		response.setLoginResult(LoginResult.OK.name());
		response.setUserName(userName);
		response.setToken(tokenService.createToken(user.getId()));
		response.setUserId(user.getId());
		return response;
	}

	@PostMapping("/register")
	public LoginResponse register(@RequestBody UserInfo user) {
		if (userService.findUserByName(user.getUsername()) != null) {
			throw new IllegalArgumentException("Username already exists");
		}
//
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setCreateTime(DateUtils.nowTime());
		user.setUpdateTime(DateUtils.nowTime());
		user.setId(UUID.randomUUID().toString());

		userService.addUser(user);

		LoginResponse response = new LoginResponse();
		response.setToken(tokenService.createToken(user.getId()));
		response.setUserId(user.getId());
		response.setUserName(user.getUsername());
		return response;
	}

	@GetMapping("/login1")
	public LoginResponse getLoginStatus() {
		System.out.println("aaa");
		LoginResponse response = new LoginResponse();
		return response;
	}
}
