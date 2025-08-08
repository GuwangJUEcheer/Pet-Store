package cn.itcast.mp.exception;

public class ThrowUtils {

	public static void throwIf(Boolean e, ErrorCode errorCode, String msg) {
		if (e) {
			throw new BizException(errorCode, msg);
		}
	}
}
