import React, {useState, useEffect} from 'react';
import '../css/PastKittensManagement.css';
import {getPastKittensUsingGet, deleteKittenUsingDelete, updateKittenUsingPost} from "../api/kittenController";
import { useUser } from "../context/UserContext";

interface Kitten {
    id: number;
    name: string;
    price: number;
    gender: string;
    color: string;
    birthday: string;
    status: string;
    description: string;
    imgUrl: string;
}

interface PastKittensResponse {
    kittens: Kitten[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

const PastKittensManagement: React.FC = () => {
    const { user } = useUser();
    const [pastKittens, setPastKittens] = useState<Kitten[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingKitten, setEditingKitten] = useState<Kitten | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 检查是否为管理员 - 只要登录就可以管理
    const canAdmin = !!user;

    const fetchPastKittens = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await getPastKittensUsingGet({page: page, size: 10});
            const data = response.data as PastKittensResponse;
            setPastKittens(data.kittens);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setTotalCount(data.totalCount);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : '未知错误');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPastKittens(1);
    }, []);

    const handleEdit = (kitten: Kitten) => {
        setEditingKitten(kitten);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('确定要删除这只小猫吗？')) {
            return;
        }

        try {
            await deleteKittenUsingDelete({id: id});
            // 重新获取数据
            fetchPastKittens(currentPage);
            alert('删除成功！');
        } catch (err) {
            alert('删除失败：' + (err instanceof Error ? err.message : '未知错误'));
        }
    };

    const handleSave = async (updatedKitten: Kitten) => {
        try {
            await updateKittenUsingPost({
                id: updatedKitten.id,
                name: updatedKitten.name,
                price: updatedKitten.price,
                gender: updatedKitten.gender,
                color: updatedKitten.color,
                birthday: updatedKitten.birthday,
                status: updatedKitten.status,
                description: updatedKitten.description,
            });

            // 重新获取数据
            fetchPastKittens(currentPage);
            setIsModalOpen(false);
            setEditingKitten(null);
            alert('更新成功！');
        } catch (err) {
            alert('更新失败：' + (err instanceof Error ? err.message : '未知错误'));
        }
    };

    const handlePageChange = (page: number) => {
        fetchPastKittens(page);
    };

    if (loading) {
        return (
            <div className="past-kittens-management">
                <div className="loading">読み込み中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="past-kittens-management">
                <div className="error">エラー: {error}</div>
            </div>
        );
    }

    return (
        <div className="past-kittens-management">
            <div className="page-header">
                <h1>{canAdmin ? '過去小猫管理' : '過去の子猫たち'}</h1>
                <div className="stats">
                    <span>総数: {totalCount}匹</span>
                    <span>ページ: {currentPage}/{totalPages}</span>
                </div>
            </div>

            {pastKittens.length === 0 ? (
                <div className="no-data">過去の小猫はまだありません。</div>
            ) : (
                <>
                    {canAdmin ? (
                        // 管理员表格视图
                        <div className="kittens-table">
                            <div className="table-header">
                                <div className="header-cell">画像</div>
                                <div className="header-cell">名前</div>
                                <div className="header-cell">性別</div>
                                <div className="header-cell">毛色</div>
                                <div className="header-cell">誕生日</div>
                                <div className="header-cell">価格</div>
                                <div className="header-cell">ステータス</div>
                                <div className="header-cell">操作</div>
                            </div>

                            {pastKittens.map((kitten) => (
                                <div key={kitten.id} className="table-row">
                                    <div className="cell image-cell">
                                        <img src={kitten.imgUrl} alt={kitten.name} className="kitten-thumbnail"/>
                                    </div>
                                    <div className="cell">{kitten.name}</div>
                                    <div className="cell">{kitten.gender}</div>
                                    <div className="cell">{kitten.color}</div>
                                    <div className="cell">{kitten.birthday}</div>
                                    <div className="cell">¥{kitten.price.toLocaleString()}</div>
                                    <div className="cell">
                                        <span className="status-badge sold">{kitten.status}</span>
                                    </div>
                                    <div className="cell actions-cell">
                                        <button className="edit-btn" onClick={() => handleEdit(kitten)}>
                                            編集
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(kitten.id)}>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // 用户图片网格视图
                        <div className="kittens-gallery">
                            {pastKittens.map((kitten) => (
                                <div key={kitten.id} className="kitten-card">
                                    <div className="kitten-image-container">
                                        <img src={kitten.imgUrl} alt="" className="kitten-image"/>
                                    </div>
                                    {canAdmin && (
                                        <div className="kitten-actions">
                                            <button className="edit-btn-small" onClick={() => handleEdit(kitten)}>
                                                編集
                                            </button>
                                            <button className="delete-btn-small" onClick={() => handleDelete(kitten.id)}>
                                                削除
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 分页控件 */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                前のページ
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({length: Math.min(totalPages, 10)}, (_, i) => {
                                    const startPage = Math.max(1, currentPage - 5);
                                    const page = startPage + i;
                                    if (page > totalPages) return null;

                                    return (
                                        <button
                                            key={page}
                                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                次のページ
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* 编辑模态框 */}
            {isModalOpen && editingKitten && (
                <EditModal
                    kitten={editingKitten}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingKitten(null);
                    }}
                />
            )}
        </div>
    );
};

// 编辑模态框组件
interface EditModalProps {
    kitten: Kitten;
    onSave: (kitten: Kitten) => void;
    onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({kitten, onSave, onCancel}) => {
    const [formData, setFormData] = useState(kitten);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>小猫情報編集</h2>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>名前:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>性別:</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="男の子">男の子</option>
                            <option value="女の子">女の子</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>毛色:</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>誕生日:</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>価格:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label>ステータス:</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="予約受付中">予約受付中</option>
                            <option value="予約済み">予約済み</option>
                            <option value="已出售">已出售</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>説明:</label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            キャンセル
                        </button>
                        <button type="submit" className="save-btn">
                            保存
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PastKittensManagement;