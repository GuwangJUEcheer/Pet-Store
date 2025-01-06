package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.mapper.KittenMapper;
import cn.itcast.mp.mapper.KittenParentMapper;
import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.service.KittenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KittenServiceImpl implements KittenService {

    @Autowired
    private KittenMapper kittenMapper;

    @Autowired
    private KittenParentMapper kittenParentMapper;

    @Override
    public List<Kitten> getAllKittens() {
        return kittenMapper.getAllKittens();
    }

    @Override
    public void addKitten(Kitten kitten) {
        kittenMapper.addKitten(kitten);
    }

    @Override
    public void updateKitten(Kitten kitten) {
        kittenMapper.updateKitten(kitten); // 更新数据库记录
    }

    @Override
    public boolean deleteKitten(int id) {
        return kittenMapper.deleteKitten(id) > 0;
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

    // 删除父母猫图片
    @Override
    public void deleteParentImage(Long id) {
        kittenParentMapper.deleteParentImage(id);
    }

    @Override
    public void updateKittenImage(Long kittenId, String oldImageUrl, String newImageUrl) {
        kittenMapper.updateKittenImage(kittenId, oldImageUrl, newImageUrl);
    }
}
