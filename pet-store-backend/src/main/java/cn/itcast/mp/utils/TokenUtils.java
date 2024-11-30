package cn.itcast.mp.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class TokenUtils {

    // 定义密钥（建议长度为 32 字节以上）
    private static final String SECRET_KEY = "your-very-long-secret-key-for-hmac-sha256";

    private static final long EXPIRATION_TIME = 3600 * 1000; // 1小时（毫秒）

    /**
     * 生成 JWT
     */
    public static String generateToken(String username, int userId) {
        return Jwts.builder()
                .setSubject(username) // 用户标识
                .claim("userId", userId) // 自定义声明
                .setIssuedAt(new Date()) // 签发时间
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 过期时间
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 使用密钥和算法签名
                .compact();
    }

    /**
     * 解析 JWT
     */
    public static Claims parseToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw e;
        } catch (JwtException e) {
            throw e;
        }
    }
    /**
     * 验证 Token 是否有效
     */
    public static boolean isTokenValid(String token) {
        try {
            parseToken(token); // 尝试解析
            return true; // 如果解析成功，则认为 Token 有效
        } catch (JwtException e) {
            return false; // 捕获异常，认为 Token 无效
        }
    }
}
