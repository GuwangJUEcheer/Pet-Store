package cn.itcast.mp.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * 日期工具类
 */
public class DateUtils {

	// 默认日期格式
    public static final String DEFAULT_DATE_FORMAT_YYMMDD = "yyyy-MM-dd";

    public static final String DEFAULT_DATE_FORMAT_yyyyMMddHHmmss = "yyyy-MM-dd HH:mm:ss";
    /**
     * 校验日期字符串是否为合法日期
     * 
     * @param dateString 日期字符串
     * @param format 日期格式字符串
     * @return 如果日期合法返回true，否则返回false
     */
    public static boolean isValidDate(String dateString, String format) {
        try {
            LocalDate.parse(dateString, DateTimeFormatter.ofPattern(format));
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    /**
     * 日期字符串转换为LocalDate对象
     * 
     * @param dateString 日期字符串
     * @param format 日期格式字符串
     * @return 转换后的LocalDate对象
     */
    public static LocalDate parseDate(String dateString, String format) {
        return LocalDate.parse(dateString, DateTimeFormatter.ofPattern(format));
    }


    /**
     * 将LocalDate对象转换为指定格式的日期字符串
     * 
     * @param date 日期对象
     * @param format 日期格式字符串
     * @return 转换后的日期字符串
     */
    public static String formatDate(LocalDate date, String format) {
        return date.format(DateTimeFormatter.ofPattern(format));
    }

    /**
     * 使用默认格式（yyyy-MM-dd）将LocalDate对象转换为日期字符串
     * 
     * @param date 日期对象
     * @return 转换后的日期字符串
     */
    public static String formatDate(LocalDate date) {
        return formatDate(date, DEFAULT_DATE_FORMAT_YYMMDD);
    }

    /**
     * 比较两个日期
     * 
     * @param date1 第一个日期
     * @param date2 第二个日期
     * @return 如果date1在date2之前返回-1，如果date1在date2之后返回1，相等返回0
     */
    public static int compareDates(LocalDate date1, LocalDate date2) {
        return date1.compareTo(date2);
    }
    
	
	public static String nowTime() {
		 DateTimeFormatter dtf = DateTimeFormatter.ofPattern( "yyyy/MM/dd HH:mm:ss" );  
		 LocalDateTime time = LocalDateTime.now();  
		 return dtf.format(time);
	}
}
