package cn.itcast.mp.mapper;

import cn.itcast.mp.model.Parent;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ParentMapper {

    @Select("SELECT * FROM parents")
    List<Parent> getAllParents();

    @Insert("INSERT INTO parents (name, gender, breed, color, birthday, description, img_url) " +
            "VALUES (#{name}, #{gender}, #{breed}, #{color}, #{birthday}, #{description}, #{imgUrl})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void addParent(Parent parent);

    @Update("UPDATE parents SET name=#{name}, gender=#{gender}, breed=#{breed}, color=#{color}, " +
            "birthday=#{birthday}, description=#{description}, img_url=#{imgUrl} WHERE id=#{id}")
    void updateParent(Parent parent);

    @Delete("DELETE FROM parents WHERE id=#{id}")
    int deleteParent(int id);

    @Select("SELECT * FROM parents WHERE id = #{id}")
    Parent findParentById(Long id);

    @Update("UPDATE parents SET img_url = #{newImgUrl} WHERE id = #{parentId}")
    void updateParentImage(@Param("parentId") Long parentId,
                          @Param("newImgUrl") String newImgUrl);

    // 根据小猫ID获取父母信息
    @Select("SELECT p.* FROM parents p " +
            "JOIN kitten_parents kp ON p.id = kp.parent_id " +
            "WHERE kp.kitten_id = #{kittenId}")
    List<Parent> findParentsByKittenId(Long kittenId);
}