package cn.itcast.mp.service;

import cn.itcast.mp.model.Parent;
import cn.itcast.mp.model.parent.AddParentRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ParentService {

	List<Parent> getAllParents();

	void addParent(MultipartFile file, AddParentRequest addParentRequest);

	void updateParent(MultipartFile file, Parent parent);

	boolean deleteParent(int id);

	Parent findParentById(Long id);

	String changeParentPhoto(Long id, MultipartFile file);

	List<Parent> findParentsByKittenId(Long kittenId);

	void assignParentToKitten(Long kittenId, int parentId, String parentRole);

	void removeParentFromKitten(Long kittenId, String parentRole);
}