package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.mapper.ParentMapper;
import cn.itcast.mp.mapper.KittenParentMapper;
import cn.itcast.mp.model.Parent;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.model.parent.AddParentRequest;
import cn.itcast.mp.s3.S3Manager;
import cn.itcast.mp.service.ParentService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ParentServiceImpl implements ParentService {

	private final String parentFolder = "parent";

	@Resource
	private ParentMapper parentMapper;

	@Resource
	private KittenParentMapper kittenParentMapper;

	@Resource
	private S3Manager s3Manager;

	@Override
	public List<Parent> getAllParents() {
		return parentMapper.getAllParents();
	}

	@Override
	public void addParent(MultipartFile file, AddParentRequest addParentRequest) {
		if (file == null || file.isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "没有上传父母照片");
		}
		// 参数校验
		addParentRequest.validate();
		try {
			Parent parent = new Parent();
			String url = s3Manager.uploadFileAndReturnUrl(file, parentFolder);
			BeanUtils.copyProperties(addParentRequest, parent);
			parent.setImgUrl(url);
			parentMapper.addParent(parent);
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "新增父母失败");
		}
	}

	@Override
	public void updateParent(MultipartFile file, Parent parent) {
		try {
			if (file != null && !file.isEmpty()) {
				String url = s3Manager.uploadFileAndReturnUrl(file, parentFolder);
				parent.setImgUrl(url);
			} else {
				Parent oldParent = findParentById((long) parent.getId());
				parent.setImgUrl(oldParent.getImgUrl());
			}
			parentMapper.updateParent(parent);
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "更新父母信息失败");
		}
	}

	@Override
	public boolean deleteParent(int id) {
		return parentMapper.deleteParent(id) > 0;
	}

	@Override
	public Parent findParentById(Long id) {
		return parentMapper.findParentById(id);
	}

	@Override
	public String changeParentPhoto(Long id, MultipartFile file) {
		try {
			Parent parent = parentMapper.findParentById(id);
			if (parent == null) {
				return null;
			}
			String url = s3Manager.uploadFileAndReturnUrl(file, parentFolder);
			parentMapper.updateParentImage(id, url);
			return url;
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "上传图片失败");
		}
	}

	@Override
	public List<Parent> findParentsByKittenId(Long kittenId) {
		return parentMapper.findParentsByKittenId(kittenId);
	}

	@Override
	public void assignParentToKitten(Long kittenId,  int parentId, String parentRole) {
		try {
			// 创建KittenParent对象并设置属性
			KittenParent kittenParent = new KittenParent();
			kittenParent.setKittenId(kittenId);
			kittenParent.setParentId(parentId);
			kittenParent.setParentRole(parentRole);
			kittenParentMapper.insert(kittenParent);
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "分配父母关系失败");
		}
	}

	@Override
	public void removeParentFromKitten(Long kittenId, String parentRole) {
		try {
			kittenParentMapper.deleteByKittenIdAndRole(kittenId, parentRole);
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "移除父母关系失败");
		}
	}
}