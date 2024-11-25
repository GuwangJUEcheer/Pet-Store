package cn.itcast.mp.service;

import cn.itcast.mp.model.User;
import cn.itcast.mp.model.UserTokens;

public interface TokenService {

    public UserTokens insertToken(User user);

    public void deleteToken(Long id);

    public void updateToken();
}
