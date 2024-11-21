package cn.itcast.mp.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class TokenUtils {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 自动生成符合算法的密钥

    private static final long EXPIRATION_TIME = 3600 * 1000; // 1小时（毫秒）

    /**
     * 生成 JWT
     *
     * @param username 用户名
     * @param userId   用户ID
     * @return 生成的 JWT
     */
    public static String generateToken(String username, int userId) {
        return Jwts.builder()
                .setSubject(username) // 用户标识
                .claim("userId", userId) // 自定义声明
                .setIssuedAt(new Date()) // 签发时间
                .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // 过期时间（1小时）
                .signWith(SECRET_KEY) // 使用密钥签名
                .compact();
    }

    /**
     * 解析 JWT
     *
     * @param token JWT 字符串
     * @return 解析后的 Claims 对象
     */
    public static Claims parseToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) // 设置密钥
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token 已过期", e);
        } catch (JwtException e) {
            throw new RuntimeException("Token 无效", e);
        }
    }

    /**
     * 验证 JWT 是否有效
     *
     * @param token JWT 字符串
     * @return 是否有效
     */
    public static boolean isTokenValid(String token) {
        try {
            parseToken(token); // 解析成功即有效
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }
}
