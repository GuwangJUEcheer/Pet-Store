package cn.itcast.mp.s3;

import cn.hutool.core.io.FileUtil;
import cn.itcast.mp.config.S3ClientConfig;
import cn.itcast.mp.exception.BizException;
import cn.itcast.mp.exception.ErrorCode;
import cn.itcast.mp.exception.ThrowUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.core.async.AsyncResponseTransformer;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.*;

import javax.annotation.Resource;
import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Component
public class S3Manager {

	@Resource
	private S3ClientConfig s3ClientConfig;

	@Resource
	private S3AsyncClient s3AsyncClient;

	public String uploadFile(String key, File file) throws Exception {
		if (file == null || !file.exists() || key.contains("\\")) {
			throw new IllegalArgumentException("非法路径或文件不存在");
		}

		PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(s3ClientConfig.getBucket())
				.key(key)
				.build();

		log.info("开始上传文件: {}", key);

		CompletableFuture<PutObjectResponse> future = s3AsyncClient.putObject(
				putObjectRequest,
				AsyncRequestBody.fromFile(file.toPath())
		);

		try {
			PutObjectResponse response = future.join();
			log.info("上传成功，ETag: {}", response.eTag());

			// 构造 URL
			return String.format("https://%s.s3.%s.amazonaws.com/%s",
					s3ClientConfig.getBucket(),
					s3ClientConfig.getRegion(),
					URLEncoder.encode(key, StandardCharsets.UTF_8.name()));

		} catch (Exception e) {
			log.error("文件上传失败: {}", e.getMessage(), e);
			throw e;
		}
	}

	public void deleteFile(String key) throws Exception {
		if (key == null || key.isEmpty() || key.contains("\\")) {
			throw new IllegalArgumentException("非法路径");
		}

		DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
				.bucket(s3ClientConfig.getBucket())
				.key(key)
				.build();

		log.info("开始删除文件: {}", key);

		CompletableFuture<DeleteObjectResponse> future = s3AsyncClient.deleteObject(deleteRequest);

		try {
			DeleteObjectResponse response = future.join();
			log.info("删除成功，RequestId: {}", response.responseMetadata().requestId());
		} catch (Exception e) {
			log.error("文件删除失败: {}", e.getMessage(), e);
			throw e;
		}
	}


	/**
	 * 下载文件
	 */
	public void downloadFile(String key, File targetFile) throws Exception {
		if (targetFile == null || key.contains("\\")) {
			throw new IllegalArgumentException("非法路径");
		}

		GetObjectRequest getObjectRequest = GetObjectRequest.builder()
				.bucket(s3ClientConfig.getBucket())
				.key(key)
				.build();

		log.info("开始下载文件: {}", key);

		CompletableFuture<GetObjectResponse> future = s3AsyncClient.getObject(
				getObjectRequest,
				AsyncResponseTransformer.toFile(targetFile.toPath())
		);

		try {
			future.join();
			log.info("文件下载成功: {}", targetFile.getAbsolutePath());
		} catch (Exception e) {
			log.error("文件下载失败: {}", e.getMessage(), e);
			throw e;
		}
	}

	/**
	 * 上传图片
	 *
	 * @param multipartFile    文件
	 * @param uploadPathPrefix 上传路径前缀
	 * @return
	 */
	public void uploadPicture(MultipartFile multipartFile, String uploadPathPrefix) {
		// 校验图片
		validPicture(multipartFile);

		String uploadFilename = FileUtil.getSuffix(multipartFile.getOriginalFilename());
		String uploadPath = String.format("/%s/%s", uploadPathPrefix, uploadFilename);
		File file = null;
		try {
			// 创建临时文件
			file = File.createTempFile(uploadPath, null);
			multipartFile.transferTo(file);
			uploadFile(uploadPath, file);
		} catch (Exception e) {
			log.error("图片上传到对象存储失败", e);
			throw new BizException("upload error");
		} finally {
			this.deleteTempFile(file);
		}
	}

	/**
	 * 校验文件
	 *
	 * @param multipartFile multipart 文件
	 */
	public void validPicture(MultipartFile multipartFile) {
		ThrowUtils.throwIf(multipartFile == null, ErrorCode.PARAMS_ERROR, "文件不能为空");
		// 1. 校验文件大小
		long fileSize = multipartFile.getSize();
		final long ONE_M = 1024 * 1024L;
		ThrowUtils.throwIf(fileSize > 25 * ONE_M, ErrorCode.PARAMS_ERROR, "文件大小不能超过 25M");
		// 2. 校验文件后缀
		String fileSuffix = FileUtil.getSuffix(multipartFile.getOriginalFilename());
		// 允许上传的文件后缀
		final List<String> ALLOW_FORMAT_LIST = Arrays.asList("jpeg", "jpg", "png", "webp");
		ThrowUtils.throwIf(!ALLOW_FORMAT_LIST.contains(fileSuffix), ErrorCode.PARAMS_ERROR, "文件类型错误");
	}

	/**
	 * 上传MultipartFile并返回URL
	 *
	 * @param multipartFile    文件
	 * @param uploadPathPrefix 上传路径前缀
	 * @return 上传后的URL
	 */
	public String uploadFileAndReturnUrl(MultipartFile multipartFile, String uploadPathPrefix) {
		// 校验图片
		validPicture(multipartFile);

		String filename = multipartFile.getOriginalFilename();
		String suffix = FileUtil.getSuffix(filename);
		String uploadPath = String.format("%s/%s.%s", uploadPathPrefix, System.currentTimeMillis(), suffix);
		File file = null;
		try {
			// 创建临时文件
			file = File.createTempFile("upload", "." + suffix);
			multipartFile.transferTo(file);
			return uploadFile(uploadPath, file);
		} catch (Exception e) {
			log.error("图片上传到对象存储失败", e);
			throw new BizException(ErrorCode.OPER_ERROR, "上传失败");
		} finally {
			this.deleteTempFile(file);
		}
	}

	/**
	 * 删除临时文件
	 */
	public void deleteTempFile(File file) {
		if (file == null) {
			return;
		}
		// 删除临时文件
		boolean deleteResult = file.delete();
		if (!deleteResult) {
			log.error("file delete error, filepath = {}", file.getAbsolutePath());
		}
	}
}
