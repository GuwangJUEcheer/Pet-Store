package cn.itcast.mp.controller;

import cn.itcast.mp.s3.S3Manager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;

@RestController
public class TestController {

	@Resource
	private S3Manager s3Manager;

	/**
	 * 测试文件上传
	 *
	 * @param multipartFile
	 * @return
	 */
	@PostMapping("/test/upload")
	public void testUploadFile(@RequestPart("file") MultipartFile multipartFile) {
		// 文件目录
		String filename = multipartFile.getOriginalFilename();
		String filepath = String.format("/littlecat/%s", filename);
		File file = null;
		try {
			// 上传文件
			file = File.createTempFile(filepath, null);
			multipartFile.transferTo(file);
			s3Manager.uploadFile(filepath, file);
			System.out.println("aaa");
		} catch (Exception e) {
			System.out.println("bbb");
		} finally {
			if (file != null) {
				// 删除临时文件
				boolean delete = file.delete();
				if (!delete) {
					System.out.println("ccc");
				}
			}
		}
	}
}
