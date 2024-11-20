package cn.itcast.mp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cn.itcast.mp.interceptor.TokenInterceptor;

@Configuration
public class InterCeptorConfig implements WebMvcConfigurer{

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		TokenInterceptor interceptor = new TokenInterceptor();
		//除了login 还有register以外 都禁止访问
		interceptor.addPathPatterns("/**").excludePathPatterns("/login", "/register");
	}	
}
