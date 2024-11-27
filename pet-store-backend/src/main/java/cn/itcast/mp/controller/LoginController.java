package cn.itcast.mp.controller;

import cn.itcast.mp.model.LoginResponse;
import cn.itcast.mp.model.User;
import cn.itcast.mp.model.UserTokens;
import cn.itcast.mp.service.TokenService;
import cn.itcast.mp.service.UserService;
import cn.itcast.mp.utils.TokenUtils;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
    public LoginResponse login(HttpServletRequest request,@RequestBody Map<String, String> userMap) {
        LoginResponse response = new LoginResponse();
        if (userMap == null || !userMap.containsKey("userName") || !userMap.containsKey("passWord")) {
            response.setCode(403);
            return response;
        }
        String userName = userMap.get("userName");
        String inputPassWord = userMap.get("passWord");
        if(StringUtils.isBlank(userName) || StringUtils.isBlank(inputPassWord)){
            response.setCode(403);
            return response;
        }
        User user = userService.getUserByName(userName);
        String password = user!=null?user.getPassword():"";
        // 从请求头中获取 token
        String token = request.getHeader("Authorization");
        if(password.equals(inputPassWord)){
            response.setCode(200);
            if(StringUtils.isBlank(token) || !TokenUtils.isTokenValid(token)){
                UserTokens tokens = tokenService.insertToken(user);
                response.setToken(tokens.getToken());
            }
            response.setLoginResult(LoginResponse.LoginResult.OK.toString());
            response.setUserId(user.getId());
            response.setUserName(userName);
        }
        return response;
    }
}
