package cn.itcast.mp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RequestConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://206.119.171.223",
                        "http://localhost:3000",
                        "http://doriapetjp.com",
                        "https://doriapetjp.com",
                        "http://www.doriapetjp.com",
                        "https://www.doriapetjp.com") // 替换为允许的具体来源
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 明确允许的方法
                .allowedHeaders("*") // 允许所有请求头
                .allowCredentials(true); // 允许携带凭证
    }
}
