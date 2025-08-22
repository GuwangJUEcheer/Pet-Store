package cn.itcast.mp.serviceImpl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.URLUtil;
import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.mapper.KittenMapper;
import cn.itcast.mp.mapper.KittenParentMapper;
import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.model.kitten.AddKittenRequest;
import cn.itcast.mp.model.kitten.UpdateKittenRequest;
import cn.itcast.mp.s3.S3Manager;
import cn.itcast.mp.service.KittenService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class KittenServiceImpl implements KittenService {

	private final String kittenFolder = "kitten";

	@Resource
	private KittenMapper kittenMapper;

	@Resource
	private KittenParentMapper kittenParentMapper;

	@Resource
	private S3Manager s3Manager;

	@Override
	public List<Kitten> getAllKittens() {
		return kittenMapper.getAllKittens();
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void addKitten(MultipartFile file, AddKittenRequest addKittenRequest) {

		if (file == null || file.isEmpty()) {
			throw new BizException(ErrorCode.PARAMS_ERROR, "没有上传小猫照片");
		}
		//参数校验
		addKittenRequest.validate();
		try {
			Kitten kitten = new Kitten();
			BeanUtils.copyProperties(addKittenRequest, kitten);
			kitten.setImgUrl("");
			kittenMapper.addKitten(kitten);
			int id = kitten.getId();
			String key = String.format("%s/%s", kittenFolder, String.valueOf(id));
			String url = s3Manager.uploadFileAndReturnUrl(file, key);
			String decodedUrl = URLUtil.decode(url);
			kitten.setImgUrl(decodedUrl);
			kittenMapper.updateKittenImage((long) id, decodedUrl);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BizException(ErrorCode.OPER_ERROR, "新增小猫失败");
		}
	}


	@Override
	public void updateKitten(Kitten kitten) {
		try {
			kittenMapper.updateKitten(kitten);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BizException(ErrorCode.OPER_ERROR, "更新小猫情报失败");
		}
	}

	@Override
	public void updateKittenWithParents(UpdateKittenRequest updateRequest) {
		try {
			// 更新基本信息
			Kitten kitten = new Kitten();
			BeanUtils.copyProperties(updateRequest, kitten);
			kittenMapper.updateKitten(kitten);

			// 更新父母关系
			Long kittenId = (long) updateRequest.getId();

			// 先删除现有的父母关系
			kittenParentMapper.deleteByKittenId(kittenId);

			// 添加新的父亲关系
			if (updateRequest.getFatherId() != 0) {
				KittenParent fatherRelation = new KittenParent();
				fatherRelation.setKittenId(kittenId);
				fatherRelation.setParentId(updateRequest.getFatherId());
				fatherRelation.setParentRole("父");
				kittenParentMapper.insert(fatherRelation);
			}

			// 添加新的母亲关系
			if (updateRequest.getMotherId() != 0) {
				KittenParent motherRelation = new KittenParent();
				motherRelation.setKittenId(kittenId);
				motherRelation.setParentId(updateRequest.getMotherId());
				motherRelation.setParentRole("母");
				kittenParentMapper.insert(motherRelation);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new BizException(ErrorCode.OPER_ERROR, "更新小猫和父母信息失败");
		}
	}

	@Override
	public boolean deleteKitten(int id) {
		try {
			Kitten kitten = kittenMapper.findKittenById((long) id);
			if (kitten == null) {
				return false;
			}
			String imageUrl = kitten.getImgUrl();
			kittenMapper.deleteKitten(id);
			String decodedUrl = URLUtil.decode(imageUrl);
			String fileName = FileUtil.getName(decodedUrl);
			s3Manager.deleteFile(String.format("%s/%s", kittenFolder, fileName));
			//删除S3上面小猫图片
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Optional<Kitten> findKittenById(Long id) {
		return Optional.ofNullable(kittenMapper.findKittenById(id));
	}

	@Override
	public List<KittenParent> findKittenParentsByKittenId(Long kittenId) {
		return kittenParentMapper.findKittenParentsByKittenId(kittenId);
	}

	@Override
	public List<String> findKittenImagesByKittenId(Long kittenId) {
		return kittenMapper.findKittenImagesByKittenId(kittenId);
	}

	@Override
	public void addKittenImage(Long kittenId, String imageUrl) {
		kittenMapper.addKittenImage(kittenId, imageUrl);
	}

	@Override
	public void deleteKittenImage(Long kittenId, String imageUrl) {
		kittenMapper.deleteKittenImage(kittenId, imageUrl);
	}

	// 更新父母猫图片
	@Override
	public void updateParentImage(Long id, String filename) {
		kittenParentMapper.updateParentImage(id, filename);
	}

	@Override
	public String changeKittenPhoto(Long id, MultipartFile file) {
		try {
			Kitten kitten = kittenMapper.findKittenById((long) id);
			if (kitten == null) {
				return null;
			}
			String key = String.format("%s/%s", kittenFolder, String.valueOf(id));
			String url = s3Manager.uploadFileAndReturnUrl(file, key);
			String decodedUrl = URLUtil.decode(url);
			kittenMapper.updateKittenImage(id, decodedUrl);
			return url;
		} catch (Exception e) {
//			throw new BizException(ErrorCode.OPER_ERROR, "上传图片失败");
			throw e;
		}
	}

	// 删除父母猫图片
	@Override
	public void deleteParentImage(Long id) {
		kittenParentMapper.deleteParentImage(id);
	}

	@Override
	public void updateKittenImage(Long kittenId, String newImageUrl) {
		kittenMapper.updateKittenImage(kittenId, newImageUrl);
	}

	// 分页相关方法实现
	@Override
	public List<Kitten> getKittensByPage(int page, int size) {
		int offset = (page - 1) * size;
		return kittenMapper.getAvailableKittensByPage(offset, size);
	}
	
	@Override
	public int getAvailableKittensCount() {
		return kittenMapper.getAvailableKittensCount();
	}

	// 过去小猫相关方法实现
	@Override
	public List<Kitten> getSoldKittens(int page, int size) {
		int offset = (page - 1) * size;
		return kittenMapper.getSoldKittens(offset, size);
	}

	@Override
	public int getSoldKittensCount() {
		return kittenMapper.getSoldKittensCount();
	}

	@Override
	public void markKittenAsSold(Long kittenId) {
		kittenMapper.updateKittenStatus(kittenId, "已出售");
	}
}
