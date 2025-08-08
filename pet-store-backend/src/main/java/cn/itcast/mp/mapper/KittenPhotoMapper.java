package cn.itcast.mp.mapper;

import cn.itcast.mp.model.KittenPhoto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 小猫照片 Mapper
 */
@Mapper
public interface KittenPhotoMapper {

	/**
	 * 根据小猫ID获取所有照片，按显示顺序排序
	 */
	List<KittenPhoto> selectByKittenIdOrderByDisplayOrder(@Param("kittenId") Long kittenId);

	/**
	 * 根据小猫ID删除所有照片
	 */
	int deleteByKittenId(@Param("kittenId") Long kittenId);

	/**
	 * 清除小猫的所有主要照片标记
	 */
	int clearPrimaryFlags(@Param("kittenId") Long kittenId);

	/**
	 * 设置照片的主要标记
	 */
	int setPrimaryFlag(@Param("photoId") Long photoId, @Param("isPrimary") Boolean isPrimary);

	/**
	 * 获取小猫照片的最大显示顺序
	 */
	Integer getMaxDisplayOrder(@Param("kittenId") Long kittenId);

	/**
	 * 批量更新照片显示顺序
	 */
	int updateDisplayOrder(@Param("photoId") Long photoId, @Param("displayOrder") Integer displayOrder);

	/**
	 * 获取小猫的主要照片
	 */
	KittenPhoto selectPrimaryByKittenId(@Param("kittenId") Long kittenId);

	/**
	 * 获取小猫照片总数
	 */
	int countByKittenId(@Param("kittenId") Long kittenId);

	@Insert(
			"INSERT INTO kitten_photos ( " +
					"kitten_id, photo_url, file_name, file_size, upload_date, display_order, is_primary " +
					") VALUES ( " +
					"#{kittenId}, #{photoUrl}, #{fileName}, #{fileSize}, #{uploadDate}, #{displayOrder}, #{isPrimary} " +
					")"
	)
	@Options(useGeneratedKeys = true, keyProperty = "id")
	int insert(KittenPhoto photo);

	/**
	 * 根据ID查询照片
	 */
	KittenPhoto selectById(@Param("id") Long id);

	/**
	 * 根据ID删除照片
	 */
	int deleteById(@Param("id") Long id);

	/**
	 * 清除小猫的所有主要照片标记（兼容方法名）
	 */
	int clearPrimaryStatus(@Param("kittenId") Long kittenId);

	/**
	 * 设置主要照片（先清除所有，再设置指定的）
	 */
	int updatePrimaryStatus(@Param("kittenId") Long kittenId, @Param("photoId") Long photoId);
}