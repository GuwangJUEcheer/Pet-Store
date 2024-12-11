package cn.itcast.mp.controller;

import cn.itcast.mp.model.Kitten;
import cn.itcast.mp.service.KittenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api")
public class
KittenController {

    @Autowired
    private KittenService kittenService;

    // 静态资源文件存储路径
    private static final String IMAGE_DIRECTORY = "C:\\Users\\17685\\Documents\\Pet-Store\\pet-store\\src\\images";

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

    @DeleteMapping("/kittens/{id}")
    public ResponseEntity<String> deleteKitten(@PathVariable int id) {
        boolean deleted = kittenService.deleteKitten(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Kitten not found with id: " + id);
        }
        return ResponseEntity.ok("Kitten deleted successfully.");
    }

    @PostMapping("/test")
    public ResponseEntity<?> addKitten(@RequestPart("img") MultipartFile file,  // 文件字段名为 "img"
                                       @RequestPart("kittenDvo") String kittenDvoJson, // JSON 参数
                                       HttpServletRequest request) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            // 反序列化 JSON
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            // 创建存储目录（如果不存在）
            File directory = new File(IMAGE_DIRECTORY);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 生成唯一文件名
            String originalFilename = file.getOriginalFilename();

            // 保存文件
            File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);
            file.transferTo(destinationFile);
            kitten.setImgUrl(originalFilename);
            kittenService.addKitten(kitten);
            return ResponseEntity.ok("{\"path\":\"" + originalFilename + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }

    @PostMapping("/updateKitten")
    public int updateKitten(@RequestPart(value = "img",required = false) MultipartFile file,  // 文件字段名为 "img"
                            @RequestPart("kittenDvo") String kittenDvoJson, // JSON 参数
                            HttpServletRequest request) {
        try {
            // 反序列化 JSON
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            if (file!=null && !file.isEmpty()) {
                // 创建存储目录（如果不存在）
                File directory = new File(IMAGE_DIRECTORY);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // 生成唯一文件名
                String originalFilename = file.getOriginalFilename();
                kitten.setImgUrl(originalFilename);
                // 保存文件
                File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);
                file.transferTo(destinationFile);
            }
            kittenService.updateKitten(kitten);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }
}
