package cn.itcast.mp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 禁用 CSRF
                .csrf().disable()
                // 启用自定义 CORS 配置
                .cors().and()
                // 配置请求授权规则
                .authorizeRequests()
                .anyRequest().permitAll(); // 允许所有请求

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // 允许凭证
        config.addAllowedOrigin("*"); // 允许所有来源
        config.addAllowedHeader("*"); // 允许所有头
        config.addAllowedMethod("*"); // 允许所有方法（GET、POST 等）
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
