package cn.itcast.mp.controller;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.model.KittenParent;
import cn.itcast.mp.service.KittenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class
KittenController {

    @Autowired
    private KittenService kittenService;

    // 静态资源文件存储路径
    private static final String IMAGE_DIRECTORY = "C:\\Users\\WINDOWS\\Pet-Store\\pet-store\\public\\images\\";

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

    @GetMapping("/public/kittens/{id}")
    public ResponseEntity<?> getKittenById(@PathVariable Long id) {
        Optional<Kitten> kitten = kittenService.findKittenById(id);
        if (kitten.isPresent()) {
            return ResponseEntity.ok(kitten.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kitten not found");
        }
    }

    @GetMapping("/public/kittens/{id}/images")
    public ResponseEntity<?> getKittenImages(@PathVariable Long id) {
        try {
            List<String> images = kittenService.findKittenImagesByKittenId(id);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch images");
        }
    }


    @GetMapping("/public/kittens/{id}/parents")
    public ResponseEntity<?> getKittenParents(@PathVariable Long id) {
        List<KittenParent> parents = kittenService.findKittenParentsByKittenId(id);
        return ResponseEntity.ok(parents);
    }

    @PostMapping("/kittens")
    public ResponseEntity<Kitten> addKitten(@RequestBody Kitten kitten) {
        kittenService.addKitten(kitten);
        return ResponseEntity.ok(kitten);
    }

    @DeleteMapping("/kittens/{id}")
    public ResponseEntity<String> deleteKitten(@PathVariable int id) {
        boolean deleted = kittenService.deleteKitten(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Kitten not found with id: " + id);
        }
        return ResponseEntity.ok("Kitten deleted successfully.");
    }

    @PostMapping("/test")
    public ResponseEntity<?> addKitten(
            @RequestPart(value = "img", required = false) MultipartFile file, // 文件可以为空
            @RequestPart("kittenDvo") String kittenDvoJson // JSON 参数
    ) {
        try {
            // 反序列化 JSON
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            // 检查是否上传了图片文件
            if (file != null && !file.isEmpty()) {
                // 创建存储目录（如果不存在）
                File directory = new File(IMAGE_DIRECTORY);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // 图片文件处理
                String originalFilename = file.getOriginalFilename(); // 获取上传文件名
                File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);

                // 如果文件已存在，则直接使用，不再重复写入
                if (!destinationFile.exists()) {
                    file.transferTo(destinationFile); // 保存新文件
                }

                // 将图片文件名设置到数据库中
                kitten.setImgUrl(originalFilename);
            }

            // 保存到数据库
            kittenService.addKitten(kitten);

            // 返回成功响应
            return ResponseEntity.ok("{\"message\":\"Kitten added successfully\", \"path\":\"" + kitten.getImgUrl() + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            // 返回错误响应
            return ResponseEntity.status(500).body("Failed to save kitten or upload image");
        }
    }


    @PostMapping("/updateKitten")
    public ResponseEntity<?> updateKitten(
            @RequestPart(value = "img", required = false) MultipartFile file,
            @RequestPart("kittenDvo") String kittenDvoJson) {
        try {
            // 解析 JSON 数据
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            // 检查是否上传了新图片
            if (file != null && !file.isEmpty()) {
                // 检查目标目录是否存在
                File directory = new File(IMAGE_DIRECTORY);
                if (!directory.exists()) {
                    directory.mkdirs(); // 如果不存在，则创建目录
                }

                // 获取上传文件名
                String originalFilename = file.getOriginalFilename();
                File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);

                // 判断文件是否已存在于目录中
                if (destinationFile.exists()) {
                    System.out.println("文件已存在：" + originalFilename);
                    // 如果文件已经存在，直接使用原文件名
                    kitten.setImgUrl(originalFilename);
                } else {
                    // 如果文件不存在，则保存新文件
                    file.transferTo(destinationFile);
                    kitten.setImgUrl(originalFilename); // 更新数据库路径
                }
            }

            // 更新数据库记录
            kittenService.updateKitten(kitten);
            return ResponseEntity.ok("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("更新失败: " + e.getMessage());
        }
    }

}
