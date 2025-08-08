package cn.itcast.mp.service;

import cn.itcast.mp.model.KittenPhoto;
import cn.itcast.mp.model.kitten.PhotoReorderRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 小猫照片服务接口
 */
public interface KittenPhotoService {

    /**
     * 上传照片
     * @param kittenId 小猫ID
     * @param file 文件
     * @param displayOrder 显示顺序（可选）
     * @param isPrimary 是否为主要照片（可选）
     * @return 照片信息
     */
    KittenPhoto uploadPhoto(Long kittenId, MultipartFile file, Integer displayOrder, Boolean isPrimary);

    /**
     * 根据小猫ID获取所有照片，按显示顺序排序
     * @param kittenId 小猫ID
     * @return 照片列表
     */
    List<KittenPhoto> getPhotosByKittenId(Long kittenId);

    /**
     * 删除照片
     * @param photoId 照片ID
     * @return 是否删除成功
     */
    boolean deletePhoto(Long photoId);

    /**
     * 设置主要照片
     * @param photoId 照片ID
     * @return 是否设置成功
     */
    boolean setPrimaryPhoto(Long photoId);

    /**
     * 重新排序照片
     * @param kittenId 小猫ID
     * @param request 排序请求
     * @return 是否排序成功
     */
    boolean reorderPhotos(Long kittenId, PhotoReorderRequest request);

    /**
     * 根据小猫ID删除所有照片（在删除小猫时调用）
     * @param kittenId 小猫ID
     * @return 删除的照片数量
     */
    int deleteAllPhotosByKittenId(Long kittenId);

    /**
     * 获取小猫的主要照片
     * @param kittenId 小猫ID
     * @return 主要照片信息，如果不存在返回null
     */
    KittenPhoto getPrimaryPhotoByKittenId(Long kittenId);

    /**
     * 获取小猫照片总数
     * @param kittenId 小猫ID
     * @return 照片总数
     */
    int getPhotoCountByKittenId(Long kittenId);

    /**
     * 批量上传照片
     * @param kittenId 小猫ID
     * @param files 文件数组
     * @return 上传的照片列表
     */
    List<KittenPhoto> bulkUploadPhotos(Long kittenId, MultipartFile[] files);
}