package cn.itcast.mp.serviceImpl;

import cn.hutool.core.io.FileUtil;
import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.exception.ThrowUtils;
import cn.itcast.mp.mapper.KittenPhotoMapper;
import cn.itcast.mp.model.KittenPhoto;
import cn.itcast.mp.model.kitten.PhotoReorderRequest;
import cn.itcast.mp.s3.S3Manager;
import cn.itcast.mp.service.KittenPhotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 小猫照片服务实现
 */
@Slf4j
@Service
public class KittenPhotoServiceImpl implements KittenPhotoService {

	@Resource
	private KittenPhotoMapper kittenPhotoMapper;

	@Resource
	private S3Manager s3Manager;

	@Override
	@Transactional
	public KittenPhoto uploadPhoto(Long kittenId, MultipartFile file, Integer displayOrder, Boolean isPrimary) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		ThrowUtils.throwIf(file == null || file.isEmpty(), ErrorCode.PARAMS_ERROR, "文件不能为空");

		// 校验文件
		s3Manager.validPicture(file);

		try {
			// 生成文件名
			String originalFilename = file.getOriginalFilename();
			String suffix = FileUtil.getSuffix(originalFilename);
			String fileName = System.currentTimeMillis() + "." + suffix;

			// 上传到S3，使用 kitten/{id}/ 目录结构
			String uploadPath = String.format("kitten/%d/%s", kittenId, fileName);
			String photoUrl = s3Manager.uploadFileAndReturnUrl(file, uploadPath);

			// 创建照片记录
			KittenPhoto photo = new KittenPhoto();
			photo.setKittenId(kittenId);
			photo.setPhotoUrl(photoUrl);
			photo.setFileName(fileName);
			photo.setFileSize(file.getSize());
			photo.setDisplayOrder(displayOrder != null ? displayOrder : getNextDisplayOrder(kittenId));
			photo.setIsPrimary(Boolean.TRUE.equals(isPrimary));
			photo.setUploadDate(LocalDateTime.now());
			photo.setCreatedAt(LocalDateTime.now());
			photo.setUpdatedAt(LocalDateTime.now());

			// 如果设置为主要照片，先清除其他主要照片标记
			if (Boolean.TRUE.equals(isPrimary)) {
				kittenPhotoMapper.clearPrimaryStatus(kittenId);
				photo.setIsPrimary(true);
			}

			// 保存照片记录
			int result = kittenPhotoMapper.insert(photo);
			ThrowUtils.throwIf(result <= 0, ErrorCode.OPER_ERROR, "照片保存失败");

			log.info("照片上传成功，小猫ID: {}, 文件名: {}", kittenId, fileName);
			return photo;

		} catch (Exception e) {
			log.error("照片上传失败，小猫ID: {}, 错误: {}", kittenId, e.getMessage(), e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "照片上传失败: " + e.getMessage());
		}
	}

	@Override
	public List<KittenPhoto> getPhotosByKittenId(Long kittenId) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		return kittenPhotoMapper.selectByKittenIdOrderByDisplayOrder(kittenId);
	}

	@Override
	@Transactional
	public boolean deletePhoto(Long photoId) {
		ThrowUtils.throwIf(photoId == null || photoId <= 0, ErrorCode.PARAMS_ERROR, "照片ID不能为空");

		// 获取照片信息
		KittenPhoto photo = kittenPhotoMapper.selectById(photoId);
		ThrowUtils.throwIf(photo == null, ErrorCode.NOT_FOUND_ERROR, "照片不存在");

		try {
			// 从S3删除文件
			String key = extractKeyFromUrl(photo.getPhotoUrl());
			if (key != null) {
				s3Manager.deleteFile(key);
			}

			// 删除数据库记录
			int result = kittenPhotoMapper.deleteById(photoId);
			ThrowUtils.throwIf(result <= 0, ErrorCode.OPER_ERROR, "照片删除失败");

			log.info("照片删除成功，照片ID: {}, 小猫ID: {}", photoId, photo.getKittenId());
			return true;

		} catch (Exception e) {
			log.error("照片删除失败，照片ID: {}, 错误: {}", photoId, e.getMessage(), e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "照片删除失败: " + e.getMessage());
		}
	}

	@Override
	@Transactional
	public boolean setPrimaryPhoto(Long photoId) {
		ThrowUtils.throwIf(photoId == null || photoId <= 0, ErrorCode.PARAMS_ERROR, "照片ID不能为空");

		// 获取照片信息
		KittenPhoto photo = kittenPhotoMapper.selectById(photoId);
		ThrowUtils.throwIf(photo == null, ErrorCode.NOT_FOUND_ERROR, "照片不存在");

		try {
			// 设置主要照片
			int result = kittenPhotoMapper.updatePrimaryStatus(photo.getKittenId(), photoId);
			ThrowUtils.throwIf(result <= 0, ErrorCode.OPER_ERROR, "设置主要照片失败");

			log.info("设置主要照片成功，照片ID: {}, 小猫ID: {}", photoId, photo.getKittenId());
			return true;

		} catch (Exception e) {
			log.error("设置主要照片失败，照片ID: {}, 错误: {}", photoId, e.getMessage(), e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "设置主要照片失败: " + e.getMessage());
		}
	}

	@Override
	@Transactional
	public boolean reorderPhotos(Long kittenId, PhotoReorderRequest request) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		ThrowUtils.throwIf(request == null || request.getPhotoOrders() == null, ErrorCode.PARAMS_ERROR, "重排序请求不能为空");

		try {
			for (PhotoReorderRequest.PhotoOrderItem order : request.getPhotoOrders()) {
				kittenPhotoMapper.updateDisplayOrder(order.getPhotoId(), order.getDisplayOrder());
			}
			log.info("照片重排序成功，小猫ID: {}, 照片数量: {}", kittenId, request.getPhotoOrders().size());
			return true;
		} catch (Exception e) {
			log.error("重排照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "重排照片失败: " + e.getMessage());
		}
	}

	@Override
	@Transactional
	public int deleteAllPhotosByKittenId(Long kittenId) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");

		try {
			// 获取所有照片
			List<KittenPhoto> photos = kittenPhotoMapper.selectByKittenIdOrderByDisplayOrder(kittenId);

			// 从S3删除所有文件
			for (KittenPhoto photo : photos) {
				try {
					String key = extractKeyFromUrl(photo.getPhotoUrl());
					if (key != null) {
						s3Manager.deleteFile(key);
					}
				} catch (Exception e) {
					log.warn("删除S3文件失败: {}", photo.getPhotoUrl(), e);
				}
			}

			// 从数据库删除所有记录
			int deletedCount = kittenPhotoMapper.deleteByKittenId(kittenId);
			log.info("删除小猫所有照片成功，小猫ID: {}, 删除数量: {}", kittenId, deletedCount);
			return deletedCount;

		} catch (Exception e) {
			log.error("删除小猫所有照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "删除照片失败: " + e.getMessage());
		}
	}

	@Override
	public KittenPhoto getPrimaryPhotoByKittenId(Long kittenId) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		return kittenPhotoMapper.selectPrimaryByKittenId(kittenId);
	}

	@Override
	public int getPhotoCountByKittenId(Long kittenId) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		return kittenPhotoMapper.countByKittenId(kittenId);
	}

	@Override
	@Transactional
	public List<KittenPhoto> bulkUploadPhotos(Long kittenId, MultipartFile[] files) {
		ThrowUtils.throwIf(kittenId == null || kittenId <= 0, ErrorCode.PARAMS_ERROR, "小猫ID不能为空");
		ThrowUtils.throwIf(files == null || files.length == 0, ErrorCode.PARAMS_ERROR, "文件不能为空");

		List<KittenPhoto> uploadedPhotos = new ArrayList<>();
		int startOrder = getNextDisplayOrder(kittenId);

		for (int i = 0; i < files.length; i++) {
			try {
				KittenPhoto photo = uploadPhoto(kittenId, files[i], startOrder + i, false);
				uploadedPhotos.add(photo);
			} catch (Exception e) {
				log.error("批量上传第{}张照片失败: {}", i + 1, files[i].getOriginalFilename(), e);
				// 继续上传其他文件，不中断整个过程
			}
		}

		log.info("批量上传完成，小猫ID: {}, 成功上传: {}/{}", kittenId, uploadedPhotos.size(), files.length);
		return uploadedPhotos;
	}

	/**
	 * 获取下一个显示顺序
	 */
	private Integer getNextDisplayOrder(Long kittenId) {
		int count = kittenPhotoMapper.countByKittenId(kittenId);
		return count;
	}

	/**
	 * 从URL中提取S3 key
	 */
	private String extractKeyFromUrl(String photoUrl) {
		if (photoUrl == null || photoUrl.isEmpty()) {
			return null;
		}

		try {
			// URL格式: https://bucket.s3.region.amazonaws.com/key
			if (photoUrl.contains(".amazonaws.com/")) {
				String[] parts = photoUrl.split(".amazonaws.com/", 2);
				if (parts.length == 2) {
					return parts[1];
				}
			}
		} catch (Exception e) {
			log.warn("提取S3 key失败，URL: {}", photoUrl);
		}

		return null;
	}
}