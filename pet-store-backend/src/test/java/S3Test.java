import cn.itcast.mp.MyApplication;
import cn.itcast.mp.s3.S3Manager;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.File;

@SpringBootTest(classes = {MyApplication.class})
public class S3Test {

	@Resource
	private S3Manager s3Manager;

	@Test
	public void testUpload() throws Exception {
		File file = new File("C:\\Users\\17685\\Pictures\\logo.jpg");
		s3Manager.uploadFile("cat/logo.png", file);
	}
}
