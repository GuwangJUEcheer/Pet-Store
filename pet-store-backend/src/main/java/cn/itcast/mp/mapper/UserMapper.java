package cn.itcast.mp.mapper;

import cn.itcast.mp.model.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User row);

    int insertSelective(User row);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User row);

    int updateByPrimaryKey(User row);

    User selectByUserName(String userName);
}