package cn.itcast.mp.controller;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.service.KittenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kittens")
public class KittenController {

    @Autowired
    private KittenService kittenService;

    @GetMapping
    public List<Kitten> getAllKittens() {
        return kittenService.getAllKittens();
    }

    @PostMapping
    public void addKitten(@RequestBody Kitten kitten) {
        kittenService.addKitten(kitten);
    }

    @PutMapping("/{id}")
    public void updateKitten(@PathVariable Long id, @RequestBody Kitten kitten) {
        kittenService.updateKitten(id, kitten);
    }

    @DeleteMapping("/{id}")
    public void deleteKitten(@PathVariable Long id) {
        kittenService.deleteKitten(id);
    }
}
