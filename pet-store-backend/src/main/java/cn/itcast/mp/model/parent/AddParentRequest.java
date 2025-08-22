package cn.itcast.mp.model.parent;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import lombok.Data;

@Data
public class AddParentRequest {
	private String name;
	private String gender;
	private String breed;
	private String color;
	private String description;

	public void validate() {
		if (name == null || name.trim().isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "父母名称不能为空");
		}
		if (name.length() > 50) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "父母名称不能超过50个字符");
		}
		if (gender == null || !(gender.equals("父") || gender.equals("母"))) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "性别只能为 父 或 母");
		}
		if (breed == null || breed.trim().isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "品种不能为空");
		}
		if (color == null || color.trim().isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "颜色不能为空");
		}
	}
}