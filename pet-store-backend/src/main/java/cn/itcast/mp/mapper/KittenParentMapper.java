package cn.itcast.mp.mapper;

import cn.itcast.mp.model.KittenParent;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenParentMapper {

    @Select("SELECT * FROM kitten_parents WHERE kitten_id = #{kittenId}")
    List<KittenParent> findKittenParentsByKittenId(Long kittenId);

    @Update("UPDATE kitten_parents SET img_url = #{filename} WHERE id = #{id}")
    void updateParentImage(@Param("id") Long id, @Param("filename") String filename);

    @Delete("DELETE FROM kitten_parents WHERE id = #{id}")
    void deleteParentImage(@Param("id") Long id);
}
