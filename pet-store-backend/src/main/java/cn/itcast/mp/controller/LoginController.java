package cn.itcast.mp.controller;

import cn.itcast.mp.model.LoginResponse;
import cn.itcast.mp.model.User;
import cn.itcast.mp.model.UserTokens;
import cn.itcast.mp.service.TokenService;
import cn.itcast.mp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    //管理员才可以登录修改页面
    @PostMapping("/login")
    public LoginResponse login(@RequestBody Map<String, String> userMap) {
        LoginResponse response = new LoginResponse();
        if (userMap == null || !userMap.containsKey("userName") || !userMap.containsKey("passWord")) {
            return response;
        }
        String userName = userMap.get("userName");
        String inputPassWord = userMap.get("passWord");
        User user = userService.getUserByName(userName);
        String password = user.getPassword();
        if(password.equals(inputPassWord)){
            UserTokens tokens = tokenService.insertToken(user);
            response.setLoginResult(LoginResponse.LoginResult.OK.toString());
            response.setToken(tokens.getToken());
            response.setUserId(user.getId());
            response.setUserName(userName);
        }
        return response;
    }
}
