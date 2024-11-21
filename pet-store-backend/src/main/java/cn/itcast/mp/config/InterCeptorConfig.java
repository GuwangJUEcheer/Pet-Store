package cn.itcast.mp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cn.itcast.mp.interceptor.TokenInterceptor;

@Configuration
public class InterCeptorConfig implements WebMvcConfigurer{

	private final TokenInterceptor tokenInterceptor;

	// 使用构造函数注入拦截器
	public InterCeptorConfig(TokenInterceptor tokenInterceptor) {
		this.tokenInterceptor = tokenInterceptor;
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		TokenInterceptor interceptor = new TokenInterceptor();
		registry.addInterceptor(tokenInterceptor)
				.addPathPatterns("/**") // 所有路径
				.excludePathPatterns("/login", "/register"); // 排除 login 和 register
	}	
}
