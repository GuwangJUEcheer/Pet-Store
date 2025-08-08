import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
    Card,
    Descriptions,
    Carousel,
    Button,
    Row,
    Col,
    Spin,
    Typography,
    Tag,
    Divider,
    Image,
} from "antd";
import {
    LeftOutlined,
} from "@ant-design/icons";
import {getKittenByIdUsingGet} from "../api/kittenController";
import ParentCards from "./ParentCards";
import '../css/parentCard.css';
import {getKittenPhotosUsingGet, type KittenPhoto} from "../api/kittenPhotoController";

const KittenDetails: React.FC = () => {
    const param = useParams<{ id: string }>();
    const id = parseInt(param?.id ?? "0", 10);
    const navigate = useNavigate();
    const [kitten, setKitten] = useState<API.Kitten>();
    const [loading, setLoading] = useState(false);
    const [kittenPhotos, setKittenPhotos] = useState<KittenPhoto[]>([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getKittenByIdUsingGet({id});
            setKitten(response.data);
            const photoResponse = await getKittenPhotosUsingGet({kittenId: id})
            const photos = photoResponse.data;
            setKittenPhotos(photos);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (id > 0) void loadData();
    }, [id]);

    // 获取状态标签颜色
    const getStatusColor = (status: string) => {
        switch (status) {
            case '予約受付中':
                return 'green';
            case '予約済み':
                return 'orange';
            default:
                return 'default';
        }
    };

    return (
        <div id="pictureDetailPage">
            <Spin spinning={loading}>
                {/* 返回按钮 */}
                <div style={{marginBottom: 20}}>
                    <Button
                        icon={<LeftOutlined/>}
                        onClick={() => navigate("/news")}
                        size="large"
                    >
                        一览に戻る
                    </Button>
                </div>

                <Row gutter={[24, 24]}>
                    {/* 轮播图区域 */}
                    <Col xs={24} lg={14}>
                        <Card
                            title="小猫写真"
                            style={{
                                height: '500px',
                                maxWidth: '100%',
                                background: '#fff',
                                borderRadius: '20px',
                                border: '3px solid #f5f5f5',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            headStyle={{
                                background: 'linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)',
                                borderBottom: 'none',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '17px 17px 0 0',
                                fontSize: '18px',
                                fontFamily: "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive"
                            }}
                            bodyStyle={{
                                height: 'calc(100% - 57px)', // 57px = 头部高度
                                padding: 0,
                                overflow: 'hidden',
                            }}
                        >
                            {kittenPhotos && kittenPhotos.length > 0 ? (
                                <Carousel
                                    autoplay={kittenPhotos.length > 1}
                                    autoplaySpeed={3000}
                                    arrows={kittenPhotos.length > 1}
                                    dots={kittenPhotos.length > 1}
                                    dotPosition="bottom"
                                    style={{height: '100%'}}
                                >
                                    {kittenPhotos.map((photo, index) => (
                                        <div
                                            key={photo.id || index}
                                            className="carousel-slide"
                                        >
                                            <Image
                                                src={photo.photoUrl}
                                                alt={`${kitten?.name} - ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '443px',
                                                    objectFit: 'cover',
                                                }}
                                                preview={{
                                                    mask: <div style={{color: 'white'}}>点击查看大图</div>
                                                }}
                                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                                onError={() => console.log('图片加载失败:', photo.photoUrl)}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <div
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    <Typography.Text type="secondary">
                                        画像がありません
                                    </Typography.Text>
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* 信息卡片区域 */}
                    <Col xs={24} lg={10}>
                        <Card
                            title={
                                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                                    <span style={{
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        fontFamily: "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive",
                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                                    }}>{kitten?.name ?? "未命名"}</span>
                                    <Tag color={getStatusColor(kitten?.status || '')} style={{
                                        fontSize: '14px',
                                        padding: '6px 12px',
                                        borderRadius: '16px',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        {kitten?.status || '-'}
                                    </Tag>
                                </div>
                            }
                            style={{
                                height: '500px',
                                background: '#fff',
                                borderRadius: '20px',
                                border: '3px solid #f5f5f5',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            headStyle={{
                                background: 'linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)',
                                borderBottom: 'none',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '17px 17px 0 0'
                            }}
                        >
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: '24px'
                            }}>
                                <Descriptions column={1} size="middle"
                                              labelStyle={{
                                                  fontWeight: 'bold',
                                                  color: '#666',
                                                  fontFamily: "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive",
                                                  fontSize: '15px'
                                              }}
                                              contentStyle={{
                                                  color: '#333',
                                                  fontWeight: '500',
                                                  fontSize: '15px'
                                              }}
                                >
                                    <Descriptions.Item label="性別">
                                        <Tag color={kitten?.gender === '男の子' ? 'blue' : 'pink'}>
                                            {kitten?.gender ?? "-"}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="毛色">
                                        {kitten?.color ?? "-"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="誕生日">
                                        {kitten?.birthday ?? "-"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="価格">
                                        <Typography.Text strong style={{fontSize: 18, color: '#a7a88b'}}>
                                            {kitten?.price ? `¥${kitten.price.toLocaleString()}` : "-"}
                                        </Typography.Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="説明">
                                        <Typography.Paragraph ellipsis={{rows: 4, expandable: true}}>
                                            {kitten?.description ?? "現時点では説明文はありません。"}
                                        </Typography.Paragraph>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Divider style={{marginTop: '3vh'}}/>
                {/* 底部区域 - 父母情报 */}
                <Row gutter={[24, 24]} style={{marginTop: 32}}>
                    <Col xs={24} lg={24}>
                        <div className="parent-info-section-fullwidth" style={{width: '100%'}}>
                            <h2 className="parent-info-title-cute">🐾✨ 父母情報 ✨🐾</h2>
                            <div className="parent-cards-container-flex">
                                <ParentCards kittenId={kitten?.id ?? 0}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default KittenDetails;
