import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import PhotoManager from '../components/PhotoManager';

const PhotoManagerPage: React.FC = () => {
    const { kittenId } = useParams<{ kittenId: string }>();
    const navigate = useNavigate();
    
    const id = parseInt(kittenId ?? "0", 10);

    if (!id || id <= 0) {
        return (
            <div style={{ padding: 20 }}>
                <Card>
                    <p>无效的小猫ID</p>
                    <Button onClick={() => navigate('/news')}>
                        返回小猫列表
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div style={{ padding: 20, background: '#faf9f7', minHeight: '100vh' }}>
            <div style={{ marginBottom: 20 }}>
                <Button
                    icon={<LeftOutlined />}
                    onClick={() => navigate("/news")}
                    size="large"
                >
                    返回小猫列表
                </Button>
            </div>

            <Card title={`小猫照片管理 - ID: ${id}`}>
                <PhotoManager kittenId={id} />
            </Card>
        </div>
    );
};

export default PhotoManagerPage;