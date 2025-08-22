import React, { useState } from 'react';
import {Layout, Modal} from 'antd';
import '../css/Sidebar.css';
import insta from '../images/ico_insta.png'
import tiktok from '../images/ico_tiktok_blk.svg'
import {Link} from 'react-router-dom';

const {Sider} = Layout;

const Sidebar: React.FC = () => {
    const [isLineModalVisible, setIsLineModalVisible] = useState(false);

    const showLineModal = () => {
        setIsLineModalVisible(true);
    };

    const handleLineModalClose = () => {
        setIsLineModalVisible(false);
    };

    return (
        <Sider width="20%" className="sidebar" theme="light">
            <div className="outScroll">
                <div className="logo">
                    <Link to="/">
                        <img src={'https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/logo_sp1.png'}
                             alt="Logo" style={{width: '50%'}}/>
                    </Link>
                </div>
                <div className="gNav">
                    <nav>
                        <ul>
                            <li><Link to="/about">DoriaPet とは<span>About us</span></Link></li>
                            <li><Link to="/news/">最新子猫情報<span>What's new</span></Link></li>
                            <li><Link to="/history/">過去子猫紹介<span>History</span></Link></li>
                            <li><Link to="/parent/">親猫紹介<span>Cat Parents</span></Link></li>
                            <li><Link to="/minuet/">ミヌエットとは<span>What is Minuet Cat</span></Link></li>
                            <li><Link to="/buy/">ご購入について<span>Buying info</span></Link></li>
                            <li><Link to="/shop/">店舗情報・アクセス<span>Shop info・Access</span></Link></li>
                            <li><Link to="https://www.nyatorajp.com/" target="_blank" rel="noopener noreferrer">自社ブランドショップサイト<span>Online Shop</span></Link>
                            </li>
                        </ul>
                    </nav>
                    <ul className="snsList">
                        <li><Link to="https://www.instagram.com/doriapet_minuet?igsh=Zm42YWYxczJ5OHVl&utm_source=qr"
                                  target="_blank"><img src={insta} alt="Instagram" style={{width: "28px"}}/></Link></li>
                        <li><Link to="https://www.tiktok.com/@doriapet?_t=8pIUi7YWL1r&_r=1" target="_blank"><img
                            src={tiktok} alt="TikTok" style={{width: "21px"}}/></Link></li>
                        <li>
                            <button 
                                onClick={showLineModal}
                                style={{
                                    background: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    borderRadius: '50%'
                                }}
                            >
                                <div style={{
                                    width: "32px",
                                    height: "32px",
                                    backgroundColor: "#06C755",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "10px",
                                    fontFamily: "Arial, sans-serif"
                                }}>
                                    LINE
                                </div>
                            </button>
                        </li>
                    </ul>
                    <div className="contactBtn">
                        <Link to="/contact/"><i className="fas fa-caret-right"></i>&nbsp;お問い合わせ</Link>
                    </div>
                </div>
            </div>

            {/* Line二维码Modal */}
            <Modal
                title="Lineアカウント"
                open={isLineModalVisible}
                onCancel={handleLineModalClose}
                footer={null}
                centered
                width={400}
                styles={{
                    header: {
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#06C755'
                    }
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 0'
                }}>
                    <img 
                        src="https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/line.jpg"
                        alt="Line QR Code"
                        style={{
                            width: '250px',
                            height: '250px',
                            objectFit: 'contain',
                            border: '1px solid #eee',
                            borderRadius: '8px'
                        }}
                    />
                    <p style={{
                        marginTop: '16px',
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        QRコードをスキャンして<br />
                        Lineアカウントを友達追加してください
                    </p>
                </div>
            </Modal>
        </Sider>
    );
};

export default Sidebar;
