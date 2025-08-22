export interface User {
    id: number | undefined;
    role: number | undefined;
    name: string | undefined;
}

// 设置用户信息
export const setUser = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

// 获取用户信息
export const getUser = (): User | undefined => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
        try {
            return JSON.parse(userStr) as User;
        } catch {
            return undefined;
        }
    }
    return undefined;
};

// 清除用户信息
export const clearUser = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
};
