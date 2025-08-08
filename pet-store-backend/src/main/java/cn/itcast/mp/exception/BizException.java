package cn.itcast.mp.exception;


import lombok.Getter;

public class BizException extends RuntimeException {
	@Getter
	private final String code;

	@Getter
	private String msg = "";

	public BizException(String message) {
		super(message);
		this.code = "400";
	}

	public BizException(String code, String message) {
		super(message);
		this.code = code;
	}

	public BizException(ErrorCode errorCode, String message) {
		super(message);
		this.code = errorCode.code();
		this.msg = message;
	}

}

