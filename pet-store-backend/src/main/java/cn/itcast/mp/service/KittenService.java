package cn.itcast.mp.service;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;

import java.util.List;
import java.util.Optional;

public interface KittenService {
    List<Kitten> getAllKittens();

    void addKitten(Kitten kitten);

    Kitten updateKitten(Kitten kitten);

    boolean deleteKitten(int id);

    Optional<Kitten> findKittenById(Long id);

    List<KittenParent> findKittenParentsByKittenId(Long kittenId);

    List<String> findKittenImagesByKittenId(Long kittenId);


}
