package cn.itcast.mp.config;

import cn.itcast.mp.interceptor.TokenInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class InterCeptorConfig implements WebMvcConfigurer {

	@Resource
	private TokenInterceptor tokenInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(tokenInterceptor)
				.addPathPatterns("/**") // 拦截所有路径
				.excludePathPatterns(
						"/login",
						"/register",
						"/public/kittens/**",
						"/public/kittens/*/parents",
						"/kittens/images/**",
						"/kittens/**",
						"/swagger-ui/**",
						"/parents/**",
						"/past/**",
						"/list",
						"/swagger-ui.html",
						"/v2/api-docs/**",
						"/v2/api-docs",
						"/swagger-resources/**",
						"/webjars/**",
						"/doc.html",                // ✅ Knife4j UI 页面
						"/favicon.ico",
						"/get/**",
						"/list"// ✅ Knife4j 页面图标
				);
	}
}
