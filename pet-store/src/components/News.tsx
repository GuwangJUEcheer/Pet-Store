import React, {useState, useEffect, useMemo} from "react";
import "../css/News.css";
import {deleteKittenUsingDelete, getPublicKittensUsingGet} from "../api/kittenController";
import {useNavigate, useParams} from "react-router-dom";
import {getUser} from "../other/userStore";
import EditModal from "../pages/EditModal";
import {Pagination, Button, Space} from "antd";
import {EyeOutlined, EditOutlined, DeleteOutlined, CameraOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {Image, Tag} from "antd";
// 定义子猫信息的类型
const News: React.FC = () => {
    const [kittenData, setKittenData] = useState<API.Kitten[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
    const [currentKitten, setCurrentKitten] = useState<API.Kitten | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
    const [editKittenId, setEditKittenId] = useState<number | undefined>(undefined);

    // 分页相关状态
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(8);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isAdmin = useMemo(() => {
        return getUser()?.role === 0
    }, []);
    const [validationErrors, setValidationErrors] = useState<{
        [key: string]: string;
    }>({});
    const navigate = useNavigate();

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
    // 获取数据
    const fetchData = async () => {
        try {
            const response = await getPublicKittensUsingGet();
            setKittenData(response.data); // 设置数据
        } catch (err) {
            setError("子猫情報を読み込めませんでした。");
            console.error("获取子猫信息失败:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);


    // 查看详情
    const handleViewDetails = (kittenId: number) => {

        navigate(`/kitten-details/${kittenId}`); // 跳转到详细页面
    };

    // 添加子猫
    const handleAddKitten = () => {
        setEditMode('add');
        setEditKittenId(undefined);
        setEditModalOpen(true);
    };

    // 编辑子猫
    const handleEditKitten = (kitten: API.Kitten) => {
        setEditMode('edit');
        setEditKittenId(kitten.id);
        setEditModalOpen(true);
    };

    // 照片管理
    const handlePhotoManagement = (kitten: API.Kitten) => {
        navigate(`/photo-manager/${kitten.id}`);
    };

    // 删除子猫
    const handleDeleteKitten = async (kitten: API.Kitten) => {
        await deleteKittenUsingDelete({id: kitten?.id} as API.deleteKittenUsingDELETEParams)
        setModalType("delete");
        setCurrentKitten(kitten);
        setIsModalOpen(true);
    };

    // 删除确认
    const handleConfirmDelete = async () => {
        if (!currentKitten) return;

        try {
            await deleteKittenUsingDelete({id: currentKitten.id} as API.deleteKittenUsingDELETEParams);
            setKittenData((prevData) =>
                prevData.filter((kitten) => kitten.id !== currentKitten.id)
            );
            setIsModalOpen(false);
        } catch (err) {
            setError("削除に失敗しました。");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentKitten(null);
        setValidationErrors({});
    };

    // 分页逻辑
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentKittens = kittenData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="news-container">
            <h1>最新子猫紹介</h1>
            <p className="subtitle">Kitten Info</p>

            {/* 管理员权限下显示添加按钮 */}
            {isAdmin && (
                <div className="admin-controls" style={{ marginBottom: 20 }}>
                    <Space>
                        <Button 
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddKitten}
                            size="large"
                        >
                            新しい子猫を追加
                        </Button>
                        <Button
                            icon={<UserOutlined />}
                            onClick={() => navigate('/parent-management')}
                            size="large"
                        >
                            父母管理
                        </Button>
                    </Space>
                </div>
            )}

            {/* 子猫信息展示 */}
            <div className="kitten-grid">
                {currentKittens.map((kitten) => (
                    <div key={kitten.id} className="kitten-card">
                        {/* 状态标签 */}
                        <div className="status-tag">
                            <Tag color={getStatusColor(kitten.status || '')}>
                                {kitten.status || '-'}
                            </Tag>
                        </div>

                        {/* 子猫图片 */}
                        <div className="image-container">
                            <Image
                                src={kitten.imgUrl}
                                alt={kitten.name}
                                className="kitten-image"
                                preview={false}
                            />
                        </div>

                        {/* 子猫基本信息 */}
                        <div className="kitten-info">
                            <h2>{kitten.name}</h2>
                            <div className="price-container">
                                <span className="yen-symbol">¥</span>
                                <span className="price-amount">{kitten.price?.toLocaleString()}</span>
                            </div>

                            {/* 按钮区域 */}
                            <div className="kitten-buttons">
                                <Space wrap>
                                    {/* 查看详情按钮（所有人可见） */}
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        onClick={() => {
                                            if (!kitten.id) return;
                                            handleViewDetails(kitten.id);
                                        }}
                                        size="small"
                                    >
                                        詳細
                                    </Button>

                                    {/* 管理员操作按钮 */}
                                    {isAdmin && (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                onClick={() => handleEditKitten(kitten)}
                                                size="small"
                                            >
                                                編集
                                            </Button>
                                            <Button
                                                icon={<CameraOutlined />}
                                                onClick={() => handlePhotoManagement(kitten)}
                                                size="small"
                                                type="dashed"
                                            >
                                                写真管理
                                            </Button>
                                            <Button
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleDeleteKitten(kitten)}
                                                size="small"
                                            >
                                                削除
                                            </Button>
                                        </>
                                    )}
                                </Space>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 分页组件 */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 32}}>
                <Pagination
                    current={currentPage}
                    total={kittenData.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    showTotal={(total, range) =>
                        `${range[0]}-${range[1]} / ${total} 匹の子猫`
                    }
                />
            </div>

            {/* 删除确认模态框 */}
            {isModalOpen && modalType === "delete" && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>本当に削除しますか？</h2>
                        <p style={{textAlign: "center"}}>{currentKitten?.name}</p>
                        <div className="modal-buttons">
                            <Space>
                                <Button 
                                    danger
                                    onClick={handleConfirmDelete}
                                >
                                    はい
                                </Button>
                                <Button onClick={handleCancel}>
                                    いいえ
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            )}

            {/* EditModal 用于添加和编辑 */}
            <EditModal
                isOpen={editModalOpen}
                close={() => setEditModalOpen(false)}
                id={editKittenId}
                mode={editMode}
                onSuccess={() => {
                    setEditModalOpen(false);
                    fetchData(); // 刷新数据
                }}
            />

        </div>
    );
};

export default News;
