import React from "react";
import { Typography, Button, message } from "antd";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import logo from "../images/logo.png";

const { Text } = Typography;

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除用户信息和token
    logout();

    // 显示成功信息
    message.success("ログアウトしました！", 2, () => {
      // 成功提示后刷新页面并返回主页
      navigate("/");
      window.location.reload(); // 刷新页面切换至游客模式
    });
  };

  return (
    <header className="header">
      <div className="mainTtl">
        <h1 className="mainTtl">
          <span className="title">
            <img src={logo} alt="サイトロゴ" width="252" />
          </span>
          <span className="text">
            猫を愛する、安心優良なブリーダーです。
            <br />
            信頼できるお客さまのもとで、子猫が幸せな時間を過ごすことを願っています。
          </span>
        </h1>
      </div>

      <div className="user-info">
        {user && (
          <>
            <Text className="username">ようこそ, {user.username} さん</Text>
            <Button type="link" className="logout-btn" onClick={handleLogout}>
              ログアウト
            </Button>
          </>
        )}
      </div>

      <div className="contactBtn">
        <a href="/contact/">
          <i className="fas fa-caret-right"></i>&nbsp;+お問い合わせ
        </a>
      </div>
    </header>
  );
};

export default Header;
