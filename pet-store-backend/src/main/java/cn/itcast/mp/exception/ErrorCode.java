package cn.itcast.mp.exception;

public enum ErrorCode {
	// ✅ 1xx - 通用错误
	PARAMS_ERROR("1000", "未知错误"),
	INVALID_PARAMETER("1001", "参数无效"),
	UNAUTHORIZED("1002", "未授权访问"),
	FORBIDDEN("1003", "无权限访问"),
	OPER_ERROR("1004", "操作失败"),
	SYSTEM_ERROR("1005", "系统错误"),
	NOT_FOUND_ERROR("1006", "没找到报错");


	private final String code;
	private final String message;

	ErrorCode(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public String code() {
		return code;
	}

	public String message() {
		return message;
	}

	@Override
	public String toString() {
		return "[" + code + "] " + message;
	}
}
