package cn.itcast.mp.service;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.model.kitten.AddKittenRequest;
import cn.itcast.mp.model.kitten.UpdateKittenRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface KittenService {
	List<Kitten> getAllKittens();

	void addKitten(MultipartFile file, AddKittenRequest kitten);

	void updateKitten(Kitten kitten);

	void updateKittenWithParents(UpdateKittenRequest updateRequest);

	boolean deleteKitten(int id);

	Optional<Kitten> findKittenById(Long id);

	List<KittenParent> findKittenParentsByKittenId(Long kittenId);

	List<String> findKittenImagesByKittenId(Long kittenId);

	void addKittenImage(Long id, String fileName);

	void deleteKittenImage(Long id, String imgUrl);

	void deleteParentImage(Long id);

	void updateParentImage(Long id, String filename);

	String changeKittenPhoto(Long id, MultipartFile file);

	void updateKittenImage(Long kittenId, String newImageUrl);

	// 分页相关方法
	List<Kitten> getKittensByPage(int page, int size);
	
	int getAvailableKittensCount();
	
	// 过去小猫相关方法
	List<Kitten> getSoldKittens(int page, int size);
	
	int getSoldKittensCount();
	
	void markKittenAsSold(Long kittenId);
}
