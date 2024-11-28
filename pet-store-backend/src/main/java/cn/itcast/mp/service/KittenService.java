package cn.itcast.mp.service;

import cn.itcast.mp.model.Kitten;

import java.util.List;

public interface KittenService {
    List<Kitten> getAllKittens();
    void addKitten(Kitten kitten);
    Kitten updateKitten(int id, Kitten kitten);
    boolean deleteKitten(int id);
}
