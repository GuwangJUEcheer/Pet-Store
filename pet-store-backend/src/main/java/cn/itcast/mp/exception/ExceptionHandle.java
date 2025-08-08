package cn.itcast.mp.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandle {

	/**
	 * 捕获自定义业务异常
	 */
	@ExceptionHandler(BizException.class)
	public ErrorResponse handleBizException(BizException ex) {
		return new ErrorResponse(ex.getCode(), ex.getMessage());
	}

	/**
	 * 捕获其他所有异常
	 */
	@ExceptionHandler(Exception.class)
	public ErrorResponse handleException(Exception ex) {
		ex.printStackTrace(); // 可选，方便本地调试
		return new ErrorResponse("500", "服务器内部错误：" + ex.getMessage());
	}
}
