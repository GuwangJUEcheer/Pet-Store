package cn.itcast.mp.serviceImpl;

import cn.hutool.core.util.StrUtil;
import cn.itcast.mp.mapper.UserMapper;
import cn.itcast.mp.model.User;
import cn.itcast.mp.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public User getUserById(int id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public User getUserByName(String name) {
        if(StrUtil.isEmpty(name)){
            return new User();
        }
        return userMapper.selectByUserName(name);
    }
}
