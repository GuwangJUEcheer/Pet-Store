package cn.itcast.mp.interceptor;

import cn.itcast.mp.utils.TokenUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 从请求头中获取 token
        String token = request.getHeader("Authorization");

        // 检查 token 是否存在
        if (token == null || token.isEmpty()) {
             return false;
        }

        // 校验 token 的有效性（示例代码，需要替换为实际的校验逻辑）
        boolean isValid = TokenUtils.isTokenValid(token);
        if (!isValid) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 状态码
            return false; // 中断请求
        }
        return true; // 继续执行后续的处理器
    }
}
