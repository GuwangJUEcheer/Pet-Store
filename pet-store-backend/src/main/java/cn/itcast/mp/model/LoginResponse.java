package cn.itcast.mp.model;

import lombok.Data;

@Data
public class LoginResponse {
	
	public enum LoginResult{
		OK,NG
	}
	
    private String token;
    private String userId;
    private String userName;
    private String loginResult;
}


