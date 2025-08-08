package cn.itcast.mp.controller;

import cn.hutool.core.util.StrUtil;
import cn.itcast.mp.model.LoginResponse;
import cn.itcast.mp.model.User;
import cn.itcast.mp.model.UserTokens;
import cn.itcast.mp.service.TokenService;
import cn.itcast.mp.service.UserService;
import cn.itcast.mp.utils.TokenUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class LoginController {

	@Resource
	private UserService userService;

	@Resource
	private TokenService tokenService;

	//管理员才可以登录修改页面
	@PostMapping("/login")
	public LoginResponse login(HttpServletRequest request, @RequestBody Map<String, String> userMap) {
		LoginResponse response = new LoginResponse();
		if (userMap == null || !userMap.containsKey("username") || !userMap.containsKey("password")) {
			response.setCode(403);
			return response;
		}
		String userName = userMap.get("username");
		String inputPassWord = userMap.get("password");
		if (StrUtil.isBlank(userName) || StrUtil.isBlank(inputPassWord)) {
			response.setCode(403);
			return response;
		}
		User user = userService.getUserByName(userName);
		System.out.println(user.getRoleId());
		String password = user != null ? user.getPassword() : "";
		// 从请求头中获取 token
		String token = request.getHeader("Authorization");
		if (password.equals(inputPassWord)) {
			response.setCode(200);
			if (StrUtil.isBlank(token) || !TokenUtils.isTokenValid(token)) {
				UserTokens tokens = tokenService.insertToken(user);
				response.setToken(tokens.getToken());
			}
			response.setLoginResult(LoginResponse.LoginResult.OK.toString());
			response.setUserId(user.getId());
			response.setUsername(userName);
			response.setRole(user.getRoleId());
		}
		return response;
	}
}
