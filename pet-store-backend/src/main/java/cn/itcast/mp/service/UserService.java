package cn.itcast.mp.service;


import cn.itcast.mp.model.User;

public interface UserService {

   public User getUserById(int id);

   public User getUserByName(String name);
}
