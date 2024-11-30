package cn.itcast.mp.interceptor;

import cn.itcast.mp.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(TokenInterceptor.class);
    private static final List<String> EXCLUDE_PATHS = Arrays.asList("/login", "/register", "/api/public/kittens");

    private final TokenUtils tokenUtils;

    public TokenInterceptor(TokenUtils tokenUtils) {
        this.tokenUtils = tokenUtils;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        logger.info("拦截到的路径: {}", uri);

        if (EXCLUDE_PATHS.contains(uri)) {
            logger.info("该路径被排除，不需要拦截");
            return true;
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            logger.warn("缺少或无效的 Authorization 头");
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }

        String token = authorizationHeader.substring(7);

        try {
            Claims claims = tokenUtils.parseToken(token);
            logger.info("Token 解析成功: {}", claims);
        } catch (ExpiredJwtException e) {
            logger.warn("Token 已过期");
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
            return false;
        } catch (JwtException e) {
            logger.error("无效的 Token");
            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return false;
        }

        return true;
    }

    private void writeErrorResponse(HttpServletResponse response, int statusCode, String message) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.getWriter().write(String.format("{\"code\": %d, \"message\": \"%s\"}", statusCode, message));
    }
}
