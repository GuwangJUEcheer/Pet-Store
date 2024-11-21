package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.mapper.UserMapper;
import cn.itcast.mp.model.User;
import cn.itcast.mp.service.UserService;
import com.alibaba.druid.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(int id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public User getUserByName(String name) {
        if(StringUtils.isEmpty(name)){
            return new User();
        }
        return userMapper.selectByUserName(name);
    }
}
