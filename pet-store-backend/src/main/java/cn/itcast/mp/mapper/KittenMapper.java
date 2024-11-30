package cn.itcast.mp.mapper;

import cn.itcast.mp.model.Kitten;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface KittenMapper {

    @Select("SELECT * FROM kittens")
    List<Kitten> getAllKittens();

    @Insert("INSERT INTO kittens (name, price, gender, color, birthday, status, img_url) " +
            "VALUES (#{name}, #{price}, #{gender}, #{color}, #{birthday}, #{status}, #{imgUrl})")
    void addKitten(Kitten kitten);

    @Update("UPDATE kittens SET name=#{name}, price=#{price}, gender=#{gender}, color=#{color}, " +
            "birthday=#{birthday}, status=#{status}, img_url=#{imgUrl} WHERE id=#{id}")
    void updateKitten(Kitten kitten);

    @Delete("DELETE FROM kittens WHERE id=#{id}")
    int deleteKitten(int id);
}
