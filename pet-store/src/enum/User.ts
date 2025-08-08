// 角色编号枚举（数字 → 语义）
export enum RoleNum {
    Admin = 0,
    VIP = 1,
    Normal = 2,
}

// 可读的中文名称映射
export const RoleNameMap: Record<RoleNum, string> = {
    [RoleNum.Admin]: '管理员',
    [RoleNum.VIP]: 'VIP用户',
    [RoleNum.Normal]: '普通用户',
};
