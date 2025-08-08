package cn.itcast.mp.controller;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.model.KittenPhoto;
import cn.itcast.mp.model.kitten.PhotoReorderRequest;
import cn.itcast.mp.service.KittenPhotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/kittens/{kittenId}/photos")
public class KittenPhotoController {

	@Resource
	private KittenPhotoService kittenPhotoService;

	@GetMapping
	public ResponseEntity<List<KittenPhoto>> getKittenPhotos(@PathVariable Long kittenId) {
		try {
			List<KittenPhoto> photos = kittenPhotoService.getPhotosByKittenId(kittenId);
			return ResponseEntity.ok(photos);
		} catch (Exception e) {
			log.error("获取小猫照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "获取照片失败");
		}
	}

	@PostMapping
	public ResponseEntity<KittenPhoto> uploadKittenPhoto(
			@PathVariable Long kittenId,
			@RequestPart("file") MultipartFile file,
			@RequestParam(value = "displayOrder", required = false) Integer displayOrder,
			@RequestParam(value = "isPrimary", required = false) Boolean isPrimary) {
		try {
			if (file.isEmpty()) {
				throw new BizException(ErrorCode.PARAMS_ERROR, "文件不能为空");
			}

			KittenPhoto photo = kittenPhotoService.uploadPhoto(kittenId, file, displayOrder, isPrimary);
			return ResponseEntity.ok(photo);
		} catch (BizException e) {
			throw e;
		} catch (Exception e) {
			log.error("上传小猫照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "上传照片失败");
		}
	}

	@DeleteMapping("/{photoId}")
	public ResponseEntity<String> deleteKittenPhoto(
			@PathVariable Long kittenId,
			@PathVariable Long photoId) {
		try {
			boolean deleted = kittenPhotoService.deletePhoto(photoId);
			if (!deleted) {
				throw new BizException(ErrorCode.NOT_FOUND_ERROR, "照片不存在");
			}
			return ResponseEntity.ok("照片删除成功");
		} catch (BizException e) {
			throw e;
		} catch (Exception e) {
			log.error("删除小猫照片失败: kittenId={}, photoId={}", kittenId, photoId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "删除照片失败");
		}
	}

	@PutMapping("/reorder")
	public ResponseEntity<String> reorderKittenPhotos(
			@PathVariable Long kittenId,
			@RequestBody PhotoReorderRequest request) {
		try {
			boolean success = kittenPhotoService.reorderPhotos(kittenId, request);
			if (!success) {
				throw new BizException(ErrorCode.OPER_ERROR, "照片排序失败");
			}
			return ResponseEntity.ok("照片排序成功");
		} catch (BizException e) {
			throw e;
		} catch (Exception e) {
			log.error("重排小猫照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "照片排序失败");
		}
	}

	@PutMapping("/{photoId}/primary")
	public ResponseEntity<String> setPrimaryPhoto(
			@PathVariable Long kittenId,
			@PathVariable Long photoId) {
		try {
			boolean success = kittenPhotoService.setPrimaryPhoto(photoId);
			if (!success) {
				throw new BizException(ErrorCode.OPER_ERROR, "设置主图失败");
			}
			return ResponseEntity.ok("主图设置成功");
		} catch (BizException e) {
			throw e;
		} catch (Exception e) {
			log.error("设置小猫主图失败: kittenId={}, photoId={}", kittenId, photoId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "设置主图失败");
		}
	}

	@PostMapping("/bulk")
	public ResponseEntity<List<KittenPhoto>> bulkUploadPhotos(
			@PathVariable Long kittenId,
			@RequestPart("files") MultipartFile[] files) {
		try {
			if (files == null || files.length == 0) {
				throw new BizException(ErrorCode.PARAMS_ERROR, "请选择要上传的文件");
			}

			List<KittenPhoto> uploadedPhotos = kittenPhotoService.bulkUploadPhotos(kittenId, files);
			return ResponseEntity.ok(uploadedPhotos);
		} catch (BizException e) {
			throw e;
		} catch (Exception e) {
			log.error("批量上传小猫照片失败: kittenId={}", kittenId, e);
			throw new BizException(ErrorCode.SYSTEM_ERROR, "批量上传失败");
		}
	}
}