import React, {useState, useEffect, useMemo, useCallback, useRef} from "react";
import "../css/News.css";
import {deleteKittenUsingDelete, getPublicKittensUsingGet, markKittenAsSoldUsingPost} from "../api/kittenController";
import {useNavigate, useParams} from "react-router-dom";
import {getUser} from "../other/userStore";
import EditModal from "../pages/EditModal";
import {Button, Space, Spin} from "antd";
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

    // 无限滚动相关状态
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(8);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [soldLoading, setSoldLoading] = useState<{ [key: number]: boolean }>({});
    
    // 无限滚动相关 refs
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const isAdmin = useMemo(() => {
        return !!getUser()
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
            case '已出售':
                return 'red';
            default:
                return 'default';
        }
    };
    // 获取初始数据
    const fetchData = async (isReset: boolean = false) => {
        try {
            const page = isReset ? 1 : currentPage;
            const response = await getPublicKittensUsingGet({
                page: page,
                size: pageSize
            });
            
            const responseData = response.data;
            const newKittens = responseData.kittens || [];
            
            if (isReset) {
                setKittenData(newKittens);
                setCurrentPage(1);
            } else {
                setKittenData(prev => [...prev, ...newKittens]);
            }
            
            setHasMore(responseData.hasMore || false);
            setTotalCount(responseData.totalCount || 0);
        } catch (err) {
            setError("子猫情報を読み込めませんでした。");
            console.error("获取子猫信息失败:", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // 加载更多数据
    const loadMoreData = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        
        setLoadingMore(true);
        try {
            const nextPage = currentPage + 1;
            const response = await getPublicKittensUsingGet({
                page: nextPage,
                size: pageSize
            });
            
            const responseData = response.data;
            const newKittens = responseData.kittens || [];
            
            setKittenData(prev => [...prev, ...newKittens]);
            setCurrentPage(nextPage);
            setHasMore(responseData.hasMore || false);
        } catch (err) {
            console.error("加载更多失败:", err);
        } finally {
            setLoadingMore(false);
        }
    }, [currentPage, pageSize, hasMore, loadingMore]);

    useEffect(() => {
        void fetchData(true);
    }, []);

    // 设置 Intersection Observer
    useEffect(() => {
        if (!loadingRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasMore && !loadingMore) {
                    loadMoreData();
                }
            },
            {
                rootMargin: '100px',
            }
        );

        observerRef.current.observe(loadingRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loadingMore, loadMoreData]);


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

    // 标记为已出售
    const handleMarkAsSold = async (kitten: API.Kitten) => {
        if (!kitten.id) return;
        
        setSoldLoading(prev => ({ ...prev, [kitten.id!]: true }));
        try {
            await markKittenAsSoldUsingPost({id: kitten.id});
            // 重新获取数据
            await fetchData(true);
            alert('小猫已标记为已出售！');
        } catch (err) {
            alert('标记失败：' + (err instanceof Error ? err.message : '未知错误'));
        } finally {
            setSoldLoading(prev => ({ ...prev, [kitten.id!]: false }));
        }
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

    // 现在数据已经在后端过滤了已出售的小猫，所以直接使用 kittenData
    const displayedKittens = kittenData;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="news-container">
            <h1>最新子猫紹介</h1>
            <p className="subtitle">Kitten Info</p>

            {/* 管理员权限下显示添加按钮 */}
            {isAdmin && (
                <div className="admin-controls" style={{marginBottom: 20}}>
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={handleAddKitten}
                            size="large"
                        >
                            新しい子猫を追加
                        </Button>
                        <Button
                            icon={<UserOutlined/>}
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
                {displayedKittens.map((kitten) => (
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
                                        icon={<EyeOutlined/>}
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
                                                icon={<EditOutlined/>}
                                                onClick={() => handleEditKitten(kitten)}
                                                size="small"
                                            >
                                                編集
                                            </Button>
                                            <Button
                                                icon={<CameraOutlined/>}
                                                onClick={() => handlePhotoManagement(kitten)}
                                                size="small"
                                                type="dashed"
                                            >
                                                写真管理
                                            </Button>
                                            {kitten.status !== '已出售' && (
                                                <Button
                                                    style={{backgroundColor: '#ff4757', borderColor: '#ff4757'}}
                                                    onClick={() => handleMarkAsSold(kitten)}
                                                    size="small"
                                                    type="primary"
                                                    loading={soldLoading[kitten.id!] || false}
                                                    disabled={soldLoading[kitten.id!] || false}
                                                >
                                                    标记为已出售
                                                </Button>
                                            )}
                                            <Button
                                                danger
                                                icon={<DeleteOutlined/>}
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

            {/* 无限滚动加载指示器 */}
            <div ref={loadingRef} style={{ display: 'flex', justifyContent: 'center', marginTop: 32, minHeight: 50 }}>
                {loadingMore && (
                    <Spin size="large" />
                )}
                {!hasMore && displayedKittens.length > 0 && (
                    <div style={{ textAlign: 'center', color: '#999', fontSize: 16 }}>
                        全ての子猫を表示しました（{totalCount}匹）
                    </div>
                )}
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
                    fetchData(true); // 重新获取数据
                }}
            />


        </div>
    );
};

export default News;
