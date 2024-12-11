package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.mapper.KittenMapper;
import cn.itcast.mp.service.KittenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KittenServiceImpl implements KittenService {

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
    public Kitten updateKitten(Kitten kitten) {
        kittenMapper.updateKitten(kitten);
        return kitten;
    }

    @Override
    public boolean deleteKitten(int id) {
        return kittenMapper.deleteKitten(id) > 0;
    }
}
