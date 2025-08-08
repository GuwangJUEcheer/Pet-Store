package cn.itcast.mp.mapper;

import cn.itcast.mp.model.Kitten;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenMapper {

	@Select("SELECT * FROM kittens")
	List<Kitten> getAllKittens();

	@Insert("INSERT INTO kittens (name, price, gender, color, birthday, status, description, img_url) " +
			"VALUES (#{name}, #{price}, #{gender}, #{color}, #{birthday}, #{status}, #{description}, #{imgUrl})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addKitten(Kitten kitten);

	@Update("UPDATE kittens SET name=#{name}, price=#{price}, gender=#{gender}, color=#{color}, " +
			"birthday=#{birthday}, status=#{status}, description=#{description} ," +
			"motherId=#{motherId},fatherId=#{fatherId} WHERE id=#{id}")
	void updateKitten(Kitten kitten);

	@Delete("DELETE FROM kittens WHERE id=#{id}")
	int deleteKitten(int id);

	@Select("SELECT * FROM kittens WHERE id = #{id}")
	Kitten findKittenById(Long id);

	@Select("SELECT img_url FROM kitten_images WHERE kitten_id = #{kittenId}")
	List<String> findKittenImagesByKittenId(Long kittenId);

	// 新增图片
	@Insert("INSERT INTO kittens (kitten_id, img_url) VALUES (#{kittenId}, #{imgUrl})")
	void addKittenImage(@Param("kittenId") Long kittenId, @Param("imgUrl") String imgUrl);

	// 删除图片
	@Delete("DELETE FROM kittens WHERE kitten_id = #{kittenId} AND img_url = #{imgUrl}")
	void deleteKittenImage(@Param("kittenId") Long kittenId, @Param("imgUrl") String imgUrl);

	// 更新图片链接
	@Update("UPDATE kittens SET img_url = #{newImgUrl} WHERE id = #{kittenId}")
	void updateKittenImage(@Param("kittenId") Long kittenId,
						   @Param("newImgUrl") String newImgUrl);

}

