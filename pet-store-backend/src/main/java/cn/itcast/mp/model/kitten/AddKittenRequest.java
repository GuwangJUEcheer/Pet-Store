package cn.itcast.mp.model.kitten;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import lombok.Data;

@Data
public class AddKittenRequest {
	private String name;
	private double price;
	private String gender;
	private String color;
	private String birthday;
	private String status;
	private String description;

	public void validate() {
		if (name == null || name.trim().isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "小猫名称不能为空");
		}
		if (name.length() > 50) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "小猫名称不能超过50个字符");
		}
		if (price <= 0) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "价格必须为正数");
		}
		if (gender == null || !(gender.equals("男の子") || gender.equals("女の子"))) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "性别只能为 男の子 或 女の子");
		}
		if (color == null || color.trim().isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "颜色不能为空");
		}
		if (birthday == null || !birthday.matches("\\d{4}-\\d{2}-\\d{2}")) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "生日格式应为 yyyy-MM-dd");
		}
	}
}
