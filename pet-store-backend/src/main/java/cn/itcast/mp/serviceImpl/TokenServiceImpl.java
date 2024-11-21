package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.mapper.UserTokensMapper;
import cn.itcast.mp.model.User;
import cn.itcast.mp.model.UserTokens;
import cn.itcast.mp.service.TokenService;
import cn.itcast.mp.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    private UserTokensMapper tokenMapper;

    @Override
    public UserTokens insertToken(User user) {
        int id = user.getId();
        String userName = user.getUsername();
        UserTokens tokens = new UserTokens();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime futureTime = now.plusHours(3);
        // 格式化时间
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);
        String expiredTime = futureTime.format(formatter);
        tokens.setToken(TokenUtils.generateToken(userName,id));
        tokens.setUserId(id);
        tokens.setCreatedAt(formattedNow);
        tokens.setExpiresAt(expiredTime);
        tokenMapper.insert(tokens);
        return tokens;
    }

    @Override
    public void deleteToken() {

    }

    @Override
    public void updateToken() {

    }
}
