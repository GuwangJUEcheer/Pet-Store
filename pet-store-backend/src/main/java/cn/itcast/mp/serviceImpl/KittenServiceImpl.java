package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.service.KittenService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KittenServiceImpl implements KittenService {

    private final List<Kitten> kittens = new ArrayList<>();

    public KittenServiceImpl() {
        // 初始化模拟数据
        kittens.add(new Kitten(1L, "/images/cat1.jpg", "ちっちゃいけど元気", "250000円（税込）", "ベンガル", "男の子", "ブラウンスポッテッドタビー", "2024-10-05"));
        kittens.add(new Kitten(2L, "/images/cat2.jpg", "茶色薄め", "260000円（税込）", "ベンガル", "女の子", "ブラウンスポッテッドタビー", "2024-10-05"));
        kittens.add(new Kitten(3L, "/images/cat3.jpg", "ぴえん顔", "280000円（税込）", "ベンガル", "女の子", "ブラウンスポッテッドタビー", "2024-10-05"));
    }

    @Override
    public List<Kitten> getAllKittens() {
        return new ArrayList<>(kittens); // 返回所有子猫数据
    }

    @Override
    public void addKitten(Kitten kitten) {
        kittens.add(kitten); // 添加新子猫
    }

    @Override
    public void updateKitten(Long id, Kitten kitten) {
        for (int i = 0; i < kittens.size(); i++) {
            if (kittens.get(i).getId().equals(id)) {
                kittens.set(i, kitten); // 更新子猫信息
                return;
            }
        }
    }

    @Override
    public void deleteKitten(Long id) {
        kittens.removeIf(kitten -> kitten.getId().equals(id)); // 删除指定子猫
    }
}
