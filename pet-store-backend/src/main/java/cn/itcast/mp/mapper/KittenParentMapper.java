package cn.itcast.mp.mapper;

import cn.itcast.mp.model.KittenParent;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface KittenParentMapper {

    @Select("SELECT * FROM kitten_parents WHERE kitten_id = #{kittenId}")
    List<KittenParent> findKittenParentsByKittenId(Long kittenId);
}

