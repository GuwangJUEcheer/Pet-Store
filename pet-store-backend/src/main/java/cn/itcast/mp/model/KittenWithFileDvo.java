package cn.itcast.mp.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class KittenWithFileDvo {
    public MultipartFile file;
    public Kitten kitten;
}
