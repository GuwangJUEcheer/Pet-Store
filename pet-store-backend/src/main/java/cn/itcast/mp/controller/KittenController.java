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
            @RequestPart(value = "img", required = false) MultipartFile file,
            @RequestPart("kittenDvo") String kittenDvoJson) {
        try {
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            if (file != null && !file.isEmpty()) {
                String filename = file.getOriginalFilename();
                File destinationFile = new File(IMAGE_DIRECTORY + filename);
                if (!destinationFile.exists()) {
                    file.transferTo(destinationFile);
                }
                kitten.setImgUrl(filename);
            } else if (kitten.getImgUrl() == null || kitten.getImgUrl().isEmpty()) {
                kitten.setImgUrl("default.jpg");
            }

            kittenService.addKitten(kitten);
            return ResponseEntity.ok("子猫追加成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("子猫追加失敗！");
        }
    }


    @PostMapping("/updateKitten")
    public ResponseEntity<?> updateKitten(
            @RequestPart(value = "img", required = false) MultipartFile file,
            @RequestPart("kittenDvo") String kittenDvoJson) {
        try {
            Kitten kitten = new ObjectMapper().readValue(kittenDvoJson, Kitten.class);

            if (file != null && !file.isEmpty()) {
                String filename = file.getOriginalFilename();
                File destinationFile = new File(IMAGE_DIRECTORY + filename);
                if (!destinationFile.exists()) {
                    file.transferTo(destinationFile);
                }
                kitten.setImgUrl(filename);
            }

            kittenService.updateKitten(kitten);
            return ResponseEntity.ok("更新成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新失敗！");
        }
    }

    @PostMapping("/kittens/images/{id}/add")
    public ResponseEntity<?> addKittenImage(
            @PathVariable Long id,
            @RequestParam(value = "img", required = false) MultipartFile file,
            @RequestParam(value = "imgName", required = false) String imgName
    ) {
        try {
            String finalImageName;

            if (file != null && !file.isEmpty()) {
                String originalFilename = file.getOriginalFilename();
                File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);
                if (!destinationFile.exists()) {
                    file.transferTo(destinationFile);
                }
                finalImageName = originalFilename;
            } else if (imgName != null && !imgName.trim().isEmpty()) {
                File existingFile = new File(IMAGE_DIRECTORY + imgName);
                if (!existingFile.exists()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("指定された画像が存在しません！");
                }
                finalImageName = imgName;
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("画像が選択されていません！");
            }

            kittenService.addKittenImage(id, finalImageName);
            return ResponseEntity.ok("画像追加成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("画像追加に失敗しました。");
        }
    }

    @PostMapping("/kittens/images/{id}/update")
    public ResponseEntity<?> updateKittenImage(
            @PathVariable Long id,
            @RequestParam("oldImgUrl") String oldImgUrl,
            @RequestParam(value = "img", required = false) MultipartFile file,
            @RequestParam(value = "newImgUrl", required = false) String newImgUrl
    ) {
        try {
            String finalImageName;

            if (file != null && !file.isEmpty()) {
                String originalFilename = file.getOriginalFilename();
                File destinationFile = new File(IMAGE_DIRECTORY + originalFilename);
                if (!destinationFile.exists()) {
                    file.transferTo(destinationFile);
                }
                finalImageName = originalFilename;
            } else if (newImgUrl != null && !newImgUrl.trim().isEmpty()) {
                File existingFile = new File(IMAGE_DIRECTORY + newImgUrl);
                if (!existingFile.exists()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("指定された画像が存在しません！");
                }
                finalImageName = newImgUrl;
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("新しい画像が選択されていません！");
            }

            kittenService.updateKittenImage(id, oldImgUrl, finalImageName);
            return ResponseEntity.ok("画像変更成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("画像変更に失敗しました。");
        }
    }

    @DeleteMapping("/kittens/images/{id}")
    public ResponseEntity<?> deleteKittenImage(
            @PathVariable Long id,
            @RequestParam("imgUrl") String imgUrl) {
        try {
            kittenService.deleteKittenImage(id, imgUrl);
            System.out.println("画像削除：" + imgUrl);
            return ResponseEntity.ok("画像削除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("画像削除に失敗しました。");
        }
    }

    @PostMapping("/kittens/parents/{id}/update")
    public ResponseEntity<?> updateParentImage(
            @PathVariable Long id,
            @RequestParam("img") MultipartFile file) {
        try {
            // 保存图片到服务器
            String filename = file.getOriginalFilename();
            File destination = new File(IMAGE_DIRECTORY + filename);
            file.transferTo(destination);

            // 更新数据库记录
            kittenService.updateParentImage(id, filename);
            return ResponseEntity.ok("画像変更成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("画像変更失敗！");
        }
    }
    @DeleteMapping("/kittens/parents/{id}/delete")
    public ResponseEntity<?> deleteParentImage(@PathVariable Long id) {
        try {
            // 删除数据库记录
            kittenService.deleteParentImage(id);
            return ResponseEntity.ok("画像削除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("画像削除失敗！");
        }
    }

}
