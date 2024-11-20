package cn.itcast.mp.config;

import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

//@Configuration
public class RedisConfig extends CachingConfigurerSupport{ 
    
    @Bean 
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory factory){
    	
    	RedisTemplate<String,Object> redisTemplate = new RedisTemplate<String, Object>();
    	//设置连接工厂
    	redisTemplate.setConnectionFactory(factory);
    	//设置序列化策略
    	redisTemplate.setKeySerializer(new StringRedisSerializer());
    	//设置value的序列化策略
    	redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
    	
    	return redisTemplate;
    }
}
