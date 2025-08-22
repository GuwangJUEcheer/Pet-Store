import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { clearUser, getUser, setUser as setUserStore } from "../other/userStore";

// 定义用户信息接口
interface User {
  username: string;
  role: string; // 用户角色，例如 "admin" 或 "user"
  userId:number;
}

// 定义 Context 类型
interface UserContextType {
  user: User | null; // 当前登录的用户信息
  login: (user: User) => void; // 登录方法
  logout: () => void; // 登出方法
}

// 创建 Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 自定义 Hook，方便访问 Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Context 提供者组件
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // 初始化时从userStore读取用户信息
    const savedUser = getUser();
    if (savedUser && savedUser.name) {
      return {
        username: savedUser.name,
        role: savedUser.role === 1 ? 'admin' : 'user',
        userId: savedUser.id || 0
      };
    }
    return null;
  });

  const login = (user: User) => {
    setUser(user); // 设置用户信息到Context
    
    // 同时保存到userStore
    setUserStore({
      id: user.userId,
      name: user.username,
      role: user.role === 'admin' ? 1 : 2
    });
  };

  const logout = () => {
    setUser(null); // 清空用户信息
    clearUser(); // 清除localStorage中的用户信息和token
  };

  // 监听token过期事件
  useEffect(() => {
    const handleTokenExpired = () => {
      setUser(null); // 清空用户状态
    };

    window.addEventListener('tokenExpired', handleTokenExpired);

    return () => {
      window.removeEventListener('tokenExpired', handleTokenExpired);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
