import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 清除 token
    navigate("/login"); // 返回登录页面
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SuccessPage;
