package cn.itcast.mp.mapper;

import cn.itcast.mp.model.Kitten;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenMapper {

    // 查询所有小猫
    @Select("SELECT id, name, price, gender, color, birthday, status, img_url AS imgUrl FROM kittens")
    List<Kitten> getAllKittens();

    // 插入新小猫
    @Insert("INSERT INTO kittens (name, price, gender, color, birthday, status, img_url) " +
            "VALUES (#{name}, #{price}, #{gender}, #{color}, #{birthday}, #{status}, #{imgUrl})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void addKitten(Kitten kitten);

    // 更新小猫信息
    @Update("UPDATE kittens SET name = #{name}, price = #{price}, gender = #{gender}, color = #{color}, " +
            "birthday = #{birthday}, status = #{status}, img_url = #{imgUrl} WHERE id = #{id}")
    void updateKitten(Kitten kitten);

    // 删除小猫
    @Delete("DELETE FROM kittens WHERE id = #{id}")
    void deleteKitten(Long id);
}
