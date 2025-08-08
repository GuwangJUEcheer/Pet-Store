package cn.itcast.mp.controller;

import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.model.Parent;
import cn.itcast.mp.model.parent.AddParentRequest;
import cn.itcast.mp.model.parent.UpdateParentRequest;
import cn.itcast.mp.service.ParentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/parents")
public class ParentController {

	@Resource
	private ParentService parentService;

	@GetMapping("/list")
	public ResponseEntity<List<Parent>> getAllParents() {
		List<Parent> parents = parentService.getAllParents();
		return ResponseEntity.ok(parents);
	}

	@GetMapping("/kitten/{kittenId}")
	public ResponseEntity<List<Parent>> getParentsByKittenId(@PathVariable Long kittenId) {
		List<Parent> parents = parentService.findParentsByKittenId(kittenId);
		return ResponseEntity.ok(parents);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Parent> getParentById(@PathVariable Long id) {
		Parent parent = parentService.findParentById(id);
		if (parent == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(parent);
	}

	@PostMapping("/add")
	public ResponseEntity<String> addParent(
			@RequestPart(value = "img", required = false) MultipartFile file,
			AddParentRequest addParentRequest) {
		try {
			parentService.addParent(file, addParentRequest);
			return ResponseEntity.ok("父母信息添加成功！");
		} catch (BizException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/update")
	public ResponseEntity<String> updateParent(
			@RequestPart(value = "img", required = false) MultipartFile file,
			UpdateParentRequest updateParentRequest) {
		try {
			Parent parent = new Parent();
			BeanUtils.copyProperties(updateParentRequest, parent);
			parentService.updateParent(file, parent);
			return ResponseEntity.ok("父母信息更新成功！");
		} catch (BizException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/change/photo")
	public ResponseEntity<String> changeParentPhoto(@RequestPart("file") MultipartFile file, @RequestParam("id") Long id) {
		try {
			if (file.isEmpty() || id < 0L) {
				throw new BizException(ErrorCode.PARAMS_ERROR, "文件不能为空");
			}
			return ResponseEntity.ok(parentService.changeParentPhoto(id, file));
		} catch (Exception e) {
			throw new BizException(ErrorCode.OPER_ERROR, "上传文件失败");
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteParent(@PathVariable int id) {
		boolean deleted = parentService.deleteParent(id);
		if (!deleted) {
			return ResponseEntity.status(404).body("Parent not found with id: " + id);
		}
		return ResponseEntity.ok("父母信息删除成功！");
	}

	@PostMapping("/assign")
	public ResponseEntity<String> assignParentToKitten(
			@RequestParam Long kittenId,
			@RequestParam int parentId,
			@RequestParam String parentRole) {
		try {
			parentService.assignParentToKitten(kittenId, parentId, parentRole);
			return ResponseEntity.ok("父母关系分配成功！");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("分配失败：" + e.getMessage());
		}
	}

	@DeleteMapping("/remove")
	public ResponseEntity<String> removeParentFromKitten(
			@RequestParam Long kittenId,
			@RequestParam String parentRole) {
		try {
			parentService.removeParentFromKitten(kittenId, parentRole);
			return ResponseEntity.ok("父母关系移除成功！");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("移除失败：" + e.getMessage());
		}
	}
}