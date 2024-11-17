package cm.itcast.mp.test;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringRunner;

import cn.itcast.mp.MyApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {MyApplication.class})
public class MyTest {

	@Autowired
	private RedisTemplate<String, String> stringRedisTemplate;
	
    @Test
    public void testSomething() {
    	
        // 获取操作字符串的ValueOperations对象
        ValueOperations<String, String> valueOps = stringRedisTemplate.opsForValue();
        
        // 定义一个键和值
        String key = "testKey";
        String value = "Hello, Redis I love you!";
        
        // 将键值对存入Redis
        valueOps.set(key, value);
        
        // 从Redis中读取值
        String valueFromRedis = valueOps.get(key);
        
        System.out.println(valueFromRedis);
    }
    
//    public static void main(String[] args) {
//		
//    	try {
//			TimerUtils.newSchedule(()->{
//				System.out.println("run time" + new Date().toLocaleString());
//			}, "2024-02-06 14:54:00", (long) 2000);
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
}

