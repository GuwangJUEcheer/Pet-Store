package cn.itcast.mp.controller;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.service.KittenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class KittenController {

    @Autowired
    private KittenService kittenService;

    // 静态资源文件存储路径
    private static final String IMAGE_DIRECTORY = "C:/upload-directory/images/";

    @GetMapping("/public/kittens")
    public ResponseEntity<List<Kitten>> getPublicKittens() {
        List<Kitten> kittens = kittenService.getAllKittens();
        return ResponseEntity.ok(kittens);
    }

    @GetMapping("/kittens")
    public ResponseEntity<List<Kitten>> getAllKittens() {
        List<Kitten> kittens = kittenService.getAllKittens();
        return ResponseEntity.ok(kittens);
    }

    @PostMapping("/kittens")
    public ResponseEntity<Kitten> addKitten(@RequestBody Kitten kitten) {
        kittenService.addKitten(kitten);
        return ResponseEntity.ok(kitten);
    }

    @PutMapping("/kittens/{id}")
    public ResponseEntity<Kitten> updateKitten(@PathVariable int id, @RequestBody Kitten kitten) {
        Kitten updatedKitten = kittenService.updateKitten(id, kitten);
        return ResponseEntity.ok(updatedKitten);
    }

    @DeleteMapping("/kittens/{id}")
    public ResponseEntity<String> deleteKitten(@PathVariable int id) {
        boolean deleted = kittenService.deleteKitten(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Kitten not found with id: " + id);
        }
        return ResponseEntity.ok("Kitten deleted successfully.");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            // 创建存储目录（如果不存在）
            File directory = new File(IMAGE_DIRECTORY);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 生成唯一文件名
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // 保存文件
            File destinationFile = new File(IMAGE_DIRECTORY + uniqueFilename);
            file.transferTo(destinationFile);

            // 返回文件访问路径
            String relativePath = "/images/" + uniqueFilename;
            return ResponseEntity.ok("{\"path\":\"" + relativePath + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
}
