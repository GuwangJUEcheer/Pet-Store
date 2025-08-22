import React, {useState, useEffect, useMemo} from "react";
import "../css/History.css";
import request from "../Request/request";
import {getUser} from "../other/userStore";
import {useNavigate} from "react-router-dom";
import {Button, Space, Modal, Form, Input, InputNumber, Select, message, Upload} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {
    deleteKittenUsingDelete,
    addKittenUsingPost,
    updateKittenUsingPost
} from "../api/kittenController";
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

const History: React.FC = () => {
    const [pastKittens, setPastKittens] = useState<Kitten[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
    const [currentKitten, setCurrentKitten] = useState<Kitten | null>(null);
    const [form] = Form.useForm();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    // 检查是否为管理员 - 只要登录就可以管理
    const canAdmin = !!user;

    const fetchPastKittens = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await request.get(`past?page=${page}&size=10`);
            const data: PastKittensResponse = await response.data;
            setPastKittens(data.kittens);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
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

    const handlePageChange = (page: number) => {
        fetchPastKittens(page);
    };

    // 管理功能
    const handleAddKitten = () => {
        setModalType('add');
        setCurrentKitten(null);
        form.resetFields();
        setUploadedFile(null);
        setIsModalOpen(true);
    };

    const handleEditKitten = (kitten: Kitten) => {
        setModalType('edit');
        setCurrentKitten(kitten);
        form.setFieldsValue({
            name: kitten.name,
            price: kitten.price,
            gender: kitten.gender,
            color: kitten.color,
            birthday: kitten.birthday,
            description: kitten.description,
            status: '已出售'
        });
        setIsModalOpen(true);
    };

    const handleDeleteKitten = (kitten: Kitten) => {
        setModalType('delete');
        setCurrentKitten(kitten);
        setIsModalOpen(true);
    };

    const handleModalOk = async () => {
        setConfirmLoading(true);
        if (modalType === 'delete') {
            try {
                if (currentKitten?.id) {
                    await deleteKittenUsingDelete({id: currentKitten.id} as any);
                    message.success('削除しました');
                    fetchPastKittens(currentPage);
                }
            } catch (err) {
                message.error('削除に失敗しました');
            }
        } else {
            try {
                const values = await form.validateFields();
                values.status = '已出售';

                if (modalType === 'add') {
                    await addKittenUsingPost({}, values, uploadedFile || undefined);
                    message.success('追加しました');
                } else {
                    await updateKittenUsingPost({...values, id: currentKitten?.id});
                    message.success('更新しました');
                }
                await fetchPastKittens(currentPage);
            } catch (err) {
                message.error(modalType === 'add' ? '追加に失敗しました' : '更新に失敗しました');
            }
        }
        setConfirmLoading(false);
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setUploadedFile(null);
    };

    const handleFileUpload = (file: File) => {
        setUploadedFile(file);
        return false; // 阻止自动上传
    };

    if (loading) {
        return (
            <div className="history-page-container">
                <div className="loading">読み込み中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="history-page-container">
                <div className="error">エラー: {error}</div>
            </div>
        );
    }

    return (
        <div className="history-page-container">
            <div className="page-header">
                <h1>{canAdmin ? '過去子猫情報' : '過去の子猫たち'}</h1>
                {canAdmin && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={handleAddKitten}
                        size="large"
                    >
                        過去小猫を追加
                    </Button>
                )}
            </div>

            {pastKittens.length === 0 ? (
                <div className="no-kittens">まだ出售された子猫はいません。</div>
            ) : (
                <>
                    <div className="kittens-gallery">
                        {pastKittens.map((kitten) => (
                            <div key={kitten.id} className="kitten-card">
                                <div className="kitten-image-container">
                                    <img
                                        src={kitten.imgUrl}
                                        alt=""
                                        className="kitten-image"
                                    />
                                </div>
                                {canAdmin && (
                                    <div className="kitten-actions">
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={() => handleEditKitten(kitten)}
                                        >
                                            編集
                                        </Button>
                                        <Button
                                            size="small"
                                            danger
                                            onClick={() => handleDeleteKitten(kitten)}
                                        >
                                            削除
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

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
                                {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
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

            {/* 管理模态框 */}
            <Modal
                title={modalType === 'add' ? '過去小猫を追加' : modalType === 'edit' ? '過去小猫を編集' : '削除確認'}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                confirmLoading={confirmLoading}
                width={600}
                okText={modalType === 'delete' ? '削除' : '保存'}
                cancelText="キャンセル"
            >
                {modalType === 'delete' ? (
                    <p>本当に「{currentKitten?.name}」を削除しますか？</p>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{status: '已出售'}}
                    >
                        <Form.Item
                            name="name"
                            label="名前"
                            rules={[{required: true, message: '名前を入力してください'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="価格"
                            rules={[{required: true, message: '価格を入力してください'}]}
                        >
                            <InputNumber
                                style={{width: '100%'}}
                                formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value!.replace(/¥\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="性別"
                            rules={[{required: true, message: '性別を選択してください'}]}
                        >
                            <Select>
                                <Select.Option value="男の子">男の子</Select.Option>
                                <Select.Option value="女の子">女の子</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="color"
                            label="毛色"
                            rules={[{required: true, message: '毛色を入力してください'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="birthday"
                            label="誕生日"
                            rules={[{required: true, message: '誕生日を入力してください'}]}
                        >
                            <Input placeholder="YYYY-MM-DD"/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="説明"
                        >
                            <Input.TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item
                            label="画像"
                            name="image"
                        >
                            <Upload
                                beforeUpload={handleFileUpload}
                                fileList={uploadedFile ? [{
                                    uid: '-1',
                                    name: uploadedFile.name,
                                    status: 'done'
                                }] : []}
                                onRemove={() => setUploadedFile(null)}
                                accept="image/*"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>
                                    画像をアップロード
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name="status" hidden>
                            <Input/>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default History;
