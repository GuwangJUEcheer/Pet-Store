package cn.itcast.mp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // 如果不需要 CSRF 保护可以禁用
            .authorizeRequests()
                .antMatchers("/**").permitAll() // 允许公共访问
                .anyRequest().authenticated()
            .and()
            .httpBasic(); // 或者启用表单登录
        return http.build();
    }
}
