package cn.itcast.mp.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import cn.itcast.mp.mapper.KittenMapper;
import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.service.KittenService;

import java.util.List;

@Service
public class KittenServiceImpl implements KittenService {
    // 假设使用一个 Mapper 或 Repository 来操作数据库
    @Autowired
    private KittenMapper kittenMapper;

    @Override
    public List<Kitten> getAllKittens() {
        return kittenMapper.getAllKittens();
    }

    @Override
    public void addKitten(Kitten kitten) {
        kittenMapper.addKitten(kitten);
    }

    @Override
    public Kitten updateKitten(int id, Kitten kitten) {
        kitten.setId(id);
        kittenMapper.updateKitten(kitten);
        return kitten;
    }

    @Override
    public boolean deleteKitten(int id) {
        int rowsAffected = kittenMapper.deleteKitten(id);
        return rowsAffected > 0;
    }
    
//    @Component
//    public class DatabaseTest implements CommandLineRunner {
//        @Autowired
//        private KittenMapper kittenMapper;
//
//        @Override
//        public void run(String... args) throws Exception {
//            System.out.println("Testing Database Connection...");
//            List<Kitten> kittens = kittenMapper.getAllKittens();
//            System.out.println("Kittens: " + kittens);
//        }
//    }
}
