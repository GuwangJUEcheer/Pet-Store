package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.mapper.UserMapper;
import cn.itcast.mp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class UsersServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(int id) {
        return userMapper.selectByPrimaryKey(id);
    }
}
