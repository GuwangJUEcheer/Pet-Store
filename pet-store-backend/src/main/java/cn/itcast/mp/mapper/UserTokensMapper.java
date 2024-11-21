package cn.itcast.mp.mapper;

import cn.itcast.mp.model.UserTokens;

public interface UserTokensMapper {
    int deleteByPrimaryKey(Long id);

    int insert(UserTokens row);

    int insertSelective(UserTokens row);

    UserTokens selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(UserTokens row);

    int updateByPrimaryKey(UserTokens row);
}