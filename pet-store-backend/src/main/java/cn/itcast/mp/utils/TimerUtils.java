package cn.itcast.mp.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.scheduling.annotation.Scheduled;

import io.micrometer.core.instrument.util.StringUtils;

/**
 * 定时任务工具类
 */
public class TimerUtils {

	//第一种定时任务
	public static void newSchedule(Runnable runneable,String startTime,Long frequency) throws ParseException {
		
		Timer timer = new Timer();
		
		if(StringUtils.isBlank(startTime)) {
			
			return;
		}
		
		if(DateUtils.isValidDate(startTime, DateUtils.DEFAULT_DATE_FORMAT_yyyyMMddHHmmss) == false) {
			
			return;
		}
		Date start = new SimpleDateFormat(DateUtils.DEFAULT_DATE_FORMAT_yyyyMMddHHmmss).parse(startTime);
		timer.schedule(new TimerTask() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				runneable.run();
			}					
		}, start,frequency);
	}
	
	//第二种定时任务 使用注解 SpringTask EnableScheduling
	
	@Scheduled(cron="0/2 * * * * ?")
	public static void EnableTask(Runnable runneable) {
		runneable.run();
	}
	
	
	@Scheduled(cron="")
	public static void Task() {
		
	}
}
