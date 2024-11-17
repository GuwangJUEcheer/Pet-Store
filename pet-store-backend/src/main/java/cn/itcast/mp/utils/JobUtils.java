package cn.itcast.mp.utils;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;

@PersistJobDataAfterExecution
@DisallowConcurrentExecution //如果任务执行时间比cron里面定义时间长 禁止并发 
public class JobUtils implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// TODO Auto-generated method stub
		
		//context表示定时任务执行的环境或者上下文  获得JobDetail对象
		JobDetail jobDetail = context.getJobDetail();//每一次都是new一个新的所以没更新 加上presistJobdataAfterExecution可以保存状态
		//但是还是new新的
		
//		System.out.println("Task名字" + jobDetail.getKey().getName());
//		System.out.println("Task Group 名字" + jobDetail.getKey().getGroup());
//		System.out.println("Class名字" + jobDetail.getJobClass());
//		System.out.println("run time" + context.getFireTime());
//		System.out.println("next run time" + context.getNextFireTime());
		
		JobDataMap jobdataMap = jobDetail.getJobDataMap();
		Integer count = (Integer)jobdataMap.get("count");
//		System.out.println(String.format("第%s次执行",Integer.toString(count)));
		jobdataMap.put("count", ++count);
		//记录任务执行次数
	}	
}
