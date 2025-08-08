package cn.itcast.mp.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;

/**
 * 上传到s3桶配置类
 */
@Configuration
@ConfigurationProperties(prefix = "s3.client")
@Data
public class S3ClientConfig {

	/**
	 * 域名
	 */
	private String host;

	/**
	 * secretId
	 */
	private String secretId;

	/**
	 * 密钥（注意不要泄露）
	 */
	private String secretKey;

	/**
	 * 区域
	 */
	private String region;

	/**
	 * 桶名
	 */
	private String bucket;

	@Bean
	public S3AsyncClient s3AsyncClient() {
		return S3AsyncClient.builder()
				.credentialsProvider(StaticCredentialsProvider.create(
						AwsBasicCredentials.create(secretId, secretKey)
				))
				.region(Region.of(region))
				.build();
	}
}

