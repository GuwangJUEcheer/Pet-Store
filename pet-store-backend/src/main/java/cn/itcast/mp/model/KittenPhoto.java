package cn.itcast.mp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 小猫照片实体类
 */
@Data
public class KittenPhoto {

	private Long id;

	private Long kittenId;

	private String photoUrl;

	private String fileName;

	private Long fileSize;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime uploadDate;

	private Integer displayOrder;

	private Boolean isPrimary;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createdAt;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime updatedAt;
}