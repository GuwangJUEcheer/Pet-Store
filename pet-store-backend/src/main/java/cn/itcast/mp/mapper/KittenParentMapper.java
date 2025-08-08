package cn.itcast.mp.mapper;

import cn.itcast.mp.model.KittenParent;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenParentMapper {

    // 根据小猫ID查找父母关系（包含父母详细信息）
    @Select("SELECT kp.id, kp.kitten_id, kp.parent_id, kp.parent_role, " +
            "p.name as parent_name, p.img_url, p.description " +
            "FROM kitten_parents kp " +
            "LEFT JOIN parents p ON kp.parent_id = p.id " +
            "WHERE kp.kitten_id = #{kittenId}")
    List<KittenParent> findKittenParentsByKittenId(Long kittenId);

    // 插入小猫父母关系
    @Insert("INSERT INTO kitten_parents (kitten_id, parent_id, parent_role) " +
            "VALUES (#{kittenId}, #{parentId}, #{parentRole})")
    void insert(KittenParent kittenParent);
    
    // 向后兼容的方法
    @Insert("INSERT INTO kitten_parents (kitten_id, parent_id, parent_role) " +
            "VALUES (#{kittenId}, #{parentId}, #{parentRole})")
    void insertKittenParent(@Param("kittenId") Long kittenId, 
                           @Param("parentId") Long parentId, 
                           @Param("parentRole") String parentRole);

    // 根据小猫ID删除所有父母关系
    @Delete("DELETE FROM kitten_parents WHERE kitten_id = #{kittenId}")
    void deleteByKittenId(@Param("kittenId") Long kittenId);

    // 根据小猫ID和角色删除特定父母关系
    @Delete("DELETE FROM kitten_parents WHERE kitten_id = #{kittenId} AND parent_role = #{parentRole}")
    void deleteByKittenIdAndRole(@Param("kittenId") Long kittenId, 
                                @Param("parentRole") String parentRole);

    // 向后兼容方法 - 根据角色删除
    @Delete("DELETE FROM kitten_parents WHERE kitten_id = #{kittenId} AND parent_role = #{parentRole}")
    void deleteKittenParentByRole(@Param("kittenId") Long kittenId, 
                                 @Param("parentRole") String parentRole);

    // 根据父母ID删除所有相关关系
    @Delete("DELETE FROM kitten_parents WHERE parent_id = #{parentId}")
    void deleteByParentId(@Param("parentId") Long parentId);

    // 根据ID删除单个记录
    @Delete("DELETE FROM kitten_parents WHERE id = #{id}")
    void deleteById(@Param("id") Long id);

    // 更新父母图片（向后兼容，可能会被弃用）
    @Update("UPDATE kitten_parents SET img_url = #{filename} WHERE id = #{id}")
    void updateParentImage(@Param("id") Long id, @Param("filename") String filename);

    // 向后兼容方法
    @Delete("DELETE FROM kitten_parents WHERE id = #{id}")
    void deleteParentImage(@Param("id") Long id);
}
