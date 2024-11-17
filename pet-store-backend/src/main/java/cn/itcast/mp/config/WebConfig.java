package cn.itcast.mp.config;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

	  @Bean
	    public CorsFilter corsFilter() {	        
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true); // 允许凭证
	        config.addAllowedOrigin("*"); // 只允许 http://localhost:3000 这个源
	        config.addAllowedHeader("*"); // 允许所有头
	        config.addAllowedMethod("*"); // 允许所有方法（GET、POST等）
	        
	        source.registerCorsConfiguration("/**", config); // 应用于所有路径
	        return new CorsFilter(source);
	    }
}

