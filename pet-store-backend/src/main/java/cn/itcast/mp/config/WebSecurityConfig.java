package cn.itcast.mp.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	  http
          // 禁用 CSRF 保护，这通常对于 REST API 是合理的选择
          .csrf().disable()
          // 配置 CORS（如果需要的话）
          .cors().and()
          // 配置权限规则
          .authorizeRequests()
              // 允许对所有URL的访问
              .anyRequest().permitAll();
    }
}
