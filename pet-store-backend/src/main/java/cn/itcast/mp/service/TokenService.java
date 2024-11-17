package cn.itcast.mp.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import cn.itcast.mp.model.UserInfo;
import cn.itcast.mp.utils.RedisUtils;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.micrometer.core.instrument.util.StringUtils;

@Service
public class TokenService{

	@Value("${jwt.private.key}")
	private String secretKey;

	@Value("${jwt.expired-time}")
	private long expiration;

	@Autowired
	private RedisUtils utils;

	@Autowired
	private UserService userService;

	public String createToken(String userId) {

		if (StringUtils.isBlank(userId)) {
			return null;
		}
		// 获得对应的User
		UserInfo user = userService.getUser(userId);
		JwtBuilder builder = Jwts.builder();
		@SuppressWarnings("deprecation")
		String token = builder.setHeaderParam("type", "JWT").setHeaderParam("alg", "HS256")
				.claim("username", user.getUsername()).setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secretKey).compact();
		return token;
	}

	public String getUsernameFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	// 示例代码简化了错误处理逻辑
	public String generateRefreshToken(String username) {
		String refreshToken = Jwts.builder().setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + expiration * 5)) // Refresh token有更长的有效期
				.signWith(SignatureAlgorithm.HS512, secretKey).compact();

		utils.setKeyValueWithTime("RT:" + username, refreshToken, expiration * 5); // 将refresh token存储到Redis
		return refreshToken;
	}
}
