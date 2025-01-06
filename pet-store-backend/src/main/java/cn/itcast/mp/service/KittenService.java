package cn.itcast.mp.service;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;

import java.util.List;
import java.util.Optional;

public interface KittenService {
    List<Kitten> getAllKittens();

    void addKitten(Kitten kitten);

    void updateKitten(Kitten kitten);

    boolean deleteKitten(int id);

    Optional<Kitten> findKittenById(Long id);

    List<KittenParent> findKittenParentsByKittenId(Long kittenId);

    List<String> findKittenImagesByKittenId(Long kittenId);

    void updateKittenImage(Long kittenId, String oldImageUrl, String newImageUrl);

    void addKittenImage(Long id, String fileName);

    void deleteKittenImage(Long id, String imgUrl);

    void deleteParentImage(Long id);

    void updateParentImage(Long id, String filename);
}
