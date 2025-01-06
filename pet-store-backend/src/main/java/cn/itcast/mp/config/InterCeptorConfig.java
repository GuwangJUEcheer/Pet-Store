package cn.itcast.mp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cn.itcast.mp.interceptor.TokenInterceptor;

@Configuration
public class InterCeptorConfig implements WebMvcConfigurer {

    @Autowired
    private TokenInterceptor tokenInterceptor;

//	// 使用构造函数注入拦截器
//	public InterCeptorConfig(TokenInterceptor tokenInterceptor) {
//		this.tokenInterceptor = tokenInterceptor;
//	}

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/**") // 拦截所有路径
                .excludePathPatterns(
                        "/login",
                        "/register",
                        "/api/public/kittens/**", // 允许匿名访问 kittens 接口
                        "/api/public/kittens/*/parents",// 允许匿名访问 kittens 的 parents 接口
                        "/api/kittens/images/**"  // 图片接口开放
                );
    }
}
