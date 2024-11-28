package cn.itcast.mp.mapper;

import cn.itcast.mp.model.Kitten;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenMapper {

    // 获取所有子猫信息
    @Select("SELECT * FROM kittens")
    List<Kitten> getAllKittens();

    // 添加新的子猫信息
    @Insert("INSERT INTO kittens (name, price, gender, color, birthday, status, img_url) " +
            "VALUES (#{name}, #{price}, #{gender}, #{color}, #{birthday}, #{status}, #{img_url})")
    @Options(useGeneratedKeys = true, keyProperty = "id") // 自动生成主键
    void addKitten(Kitten kitten);

    // 更新子猫信息
    @Update("UPDATE kittens SET name = #{name}, price = #{price}, gender = #{gender}, color = #{color}, " +
            "birthday = #{birthday}, status = #{status}, img_url = #{img_url} WHERE id = #{id}")
    int updateKitten(Kitten kitten);

    // 删除子猫信息
    @Delete("DELETE FROM kittens WHERE id = #{id}")
    int deleteKitten(int id);
}
