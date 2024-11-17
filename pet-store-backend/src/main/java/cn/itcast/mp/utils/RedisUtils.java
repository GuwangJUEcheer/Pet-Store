package cn.itcast.mp.utils;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisUtils {

	@Autowired
	RedisTemplate<String, Object> redisTemplate;

	public void setKeyValue(String key, Object value) {
		redisTemplate.opsForValue().set(key, value);
	}

	public Object getValueByKey(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public void setKeyValueWithTime(String key, Object value, Long time) {
		redisTemplate.opsForValue().set(key, value, time, TimeUnit.MILLISECONDS);
	}
}
