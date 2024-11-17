package cn.itcast.mp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import cn.itcast.mp.model.UserInfo;

@Mapper
public interface UserMapper {
	
	@Select("SELECT * FROM user")
	List<UserInfo> getAllUsers();

	@Select("SELECT * FROM user WHERE id = #{id}")
	UserInfo getUserById(String id);

	void insertUser(UserInfo user);

	@Update("UPDATE user SET username=#{username}, age=#{age} WHERE id=#{id}")
	void updateUser(UserInfo user);

	@Delete("DELETE FROM user WHERE id=#{id}")
	void deleteUser(Long id);
	
	@Select("SELECT * FROM user WHERE username=#{username}")
	UserInfo findUserByName(String username);
}
