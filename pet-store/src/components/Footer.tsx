// Footer.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footerInner">
                <div className="footerContent">
                    {/* Logo区域 */}
                    <div className="footerLogo">
                        <Link to="/">
                            <img src={'https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/logo_sp1.png'} alt="DoriaPet Logo" />
                        </Link>
                    </div>
                    
                    {/* 导航菜单 */}
                    <nav className="footNav">
                        <ul className="navList">
                            <li>
                                <Link to="/">TOP</Link>
                            </li>
                            <li>
                                <Link to="/about/">DoriaPetとは</Link>
                            </li>
                            <li>
                                <Link to="/news/">最新子猫情報</Link>
                            </li>
                            <li>
                                <Link to="/history/">過去子猫紹介</Link>
                            </li>
                            <li>
                                <Link to="/parent/">親猫紹介</Link>
                            </li>
                            <li>
                                <Link to="/minuet/">ミヌエットとは</Link>
                            </li>
                            <li>
                                <Link to="/buy/">ご購入について</Link>
                            </li>
                            <li>
                                <Link to="/services/">5大特典サービス</Link>
                            </li>
                            <li>
                                <Link to="/health-guarantee/">生体保証</Link>
                            </li>
                            <li>
                                <Link to="/shop/">店舗情報・アクセス</Link>
                            </li>
                            <li>
                                <Link to="/contact/">お問い合わせ</Link>
                            </li>
                            <li>
                                <Link to="/login/">管理者登録</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <div className="footerBottom">
                    <p className="copyright">© Cat Lounge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
