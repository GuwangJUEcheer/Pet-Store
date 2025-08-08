package cn.itcast.mp.controller;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.model.kitten.AddKittenRequest;
import cn.itcast.mp.model.kitten.UpdateKittenRequest;
import cn.itcast.mp.service.KittenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController("kitten")
public class KittenController {

	@Resource
	private KittenService kittenService;

	@GetMapping("/list")
	public ResponseEntity<List<Kitten>> getPublicKittens() {
		List<Kitten> kittens = kittenService.getAllKittens();
		return ResponseEntity.ok(kittens);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getKittenById(@PathVariable Long id) {
		Optional<Kitten> kitten = kittenService.findKittenById(id);
		if (kitten.isPresent()) {
			return ResponseEntity.ok(kitten.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kitten not found");
		}
	}

	//找到小猫的父母
	@GetMapping("/parents")
	public ResponseEntity<?> getKittenParents(@RequestParam("id") Long id) {
		List<KittenParent> parents = kittenService.findKittenParentsByKittenId(id);
		return ResponseEntity.ok(parents);
	}

	@PostMapping(value = "/change/photo")
	public ResponseEntity<String> changeKittenPhoto(@RequestPart("file") MultipartFile file, @RequestParam("id") Long id) {
		try {
			// 1. 校验参数
			if (file.isEmpty() || id < 0L) {
				throw new BizException(ErrorCode.PARAMS_ERROR, "文件不能为空");
			}

			return ResponseEntity.ok(kittenService.changeKittenPhoto(id, file));

		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "上传文件失败");
		}
	}


	@DeleteMapping("/kittens/{id}")
	public ResponseEntity<String> deleteKitten(@PathVariable int id) {
		boolean deleted = kittenService.deleteKitten(id);
		if (!deleted) {
			return ResponseEntity.status(404).body("Kitten not found with id: " + id);
		}
		return ResponseEntity.ok("Kitten deleted successfully.");
	}

	@PostMapping("/add")
	public ResponseEntity<?> addKitten(
			@RequestPart(value = "img", required = false) MultipartFile file,
			AddKittenRequest addKittenRequest) {
		kittenService.addKitten(file, addKittenRequest);
		return ResponseEntity.ok("子猫追加成功！");
	}


	@PostMapping("/updateKitten")
	public ResponseEntity<?> updateKitten(@RequestBody UpdateKittenRequest updateKittenRequest) {
		try {
			kittenService.updateKittenWithParents(updateKittenRequest);
			return ResponseEntity.ok("更新小猫情报成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新失敗！");
		}
	}

	@DeleteMapping("/kittens/parents/{id}/delete")
	public ResponseEntity<?> deleteParentImage(@PathVariable Long id) {
		try {
			// 删除数据库记录
			kittenService.deleteParentImage(id);
			return ResponseEntity.ok("画像削除成功！");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("画像削除失敗！");
		}
	}
}
