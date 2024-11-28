package cn.itcast.mp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/kittens/upload")
@CrossOrigin
public class UploadController {

    private static final String IMAGE_DIR = "src/main/resources/static/images/";

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // 文件保存
        String fileName = file.getOriginalFilename();
        File destFile = new File(IMAGE_DIR + fileName);

        // 创建目录（如果不存在）
        if (!destFile.getParentFile().exists()) {
            destFile.getParentFile().mkdirs();
        }

        file.transferTo(destFile);

        // 返回文件名（前端存储相对路径）
        return ResponseEntity.ok(fileName);
    }
}
