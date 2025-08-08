import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Input, Select, DatePicker, Upload, message, Space, Popconfirm} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined} from '@ant-design/icons';
import {
    getAllParentsUsingGet,
    addParentUsingPost,
    updateParentUsingPost,
    deleteParentUsingDelete,
} from '../api/parentController';
import dayjs from 'dayjs';

// 使用API类型定义
type Parent = API.Parent;

const ParentManagement: React.FC = () => {
    const [parents, setParents] = useState<Parent[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingParent, setEditingParent] = useState<Parent | null>(null);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        void fetchParents();
    }, []);

    const fetchParents = async () => {
        setLoading(true);
        try {
            const response = await getAllParentsUsingGet();
            setParents(response.data || []);
        } catch (error) {
            message.error('获取父母信息失败');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setConfirmLoading(true);
        setEditingParent(null);
        setImageUrl('');
        setSelectedImageFile(null);
        form.resetFields();
        setModalVisible(true);
        setConfirmLoading(false);
    };

    const handleEdit = (parent: Parent) => {
        setConfirmLoading(true);
        setEditingParent(parent);
        setImageUrl(parent.imgUrl || '');
        form.setFieldsValue({
            name: parent.name,
            gender: parent.gender,
            breed: parent.breed,
            color: parent.color,
            birthday: parent.birthday ? dayjs(parent.birthday) : null,
            description: parent.description
        });
        setModalVisible(true);
        setConfirmLoading(false);
    };

    const handleDelete = async (id: number) => {
        try {
            setConfirmLoading(true);
            await deleteParentUsingDelete({id});
            message.success('删除成功');
            setLoading(true);
            await fetchParents();
        } catch (error) {
            message.error('删除失败');
        } finally {
            setConfirmLoading(false);
            setLoading(false);
        }
    };

    const handleModalOk = async () => {
        try {
            setConfirmLoading(true);
            const values = await form.validateFields();
            const formData = {
                ...values,
                birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
            };

            if (editingParent) {
                // 更新 - 需要包含 id
                const updateData = {...formData, id: editingParent.id};
                await updateParentUsingPost(updateData, {}, selectedImageFile || undefined);
                message.success('更新成功');
            } else {
                // 添加
                await addParentUsingPost(formData, {}, selectedImageFile || undefined);
                message.success('添加成功');
            }

            setModalVisible(false);
            await fetchParents();
        } catch (error) {
            message.error('操作失败');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async ({file}: any) => {
        try {
            setUploading(true);

            // 保存文件引用
            setSelectedImageFile(file);

            // 预览图片
            const reader = new FileReader();
            reader.onload = () => setImageUrl(reader.result as string);
            reader.readAsDataURL(file);

        } catch (error) {
            message.error('文件处理失败');
        } finally {
            setUploading(false);
        }
    };

    const uploadButton = (
        <div>
            {uploading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const columns = [
        {
            title: '照片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (imgUrl: string) => (
                <img src={imgUrl} alt="parent" style={{width: 60, height: 60, objectFit: 'cover', borderRadius: 8}}/>
            ),
        },
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性別',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: '品種',
            dataIndex: 'breed',
            key: 'breed',
        },
        {
            title: '色',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: '誕生日',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Parent) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(record)}
                        size="small"
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确定删除这个父母信息吗？"
                        onConfirm={() => handleDelete(record?.id ?? 0)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button
                            icon={<DeleteOutlined/>}
                            danger
                            size="small"
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{padding: '16px 8px', maxWidth: '100%', backgroundColor: '#faf9f7', minHeight: '100vh'}}>
            <div style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8
            }}>
                <h2 style={{margin: 0, color: '#908663'}}>父母管理</h2>
                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    添加父母
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={parents}
                loading={loading}
                rowKey="id"
                scroll={{x: 800}} // 添加横向滚动
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`,
                    responsive: true, // 响应式分页
                }}
            />

            <Modal
                title={editingParent ? '编辑父母信息' : '添加父母信息'}
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
                width="90vw"
                style={{maxWidth: 600, top: 20}}
                okText="确定"
                cancelText="取消"
                confirmLoading={confirmLoading}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={handleUpload}
                    style={{marginBottom: 16}}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>
                    ) : (
                        uploadButton
                    )}
                </Upload>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="名前"
                        name="name"
                        rules={[{required: true, message: '请输入父母名字'}]}
                    >
                        <Input placeholder="请输入父母名字"/>
                    </Form.Item>

                    <Form.Item
                        label="性別"
                        name="gender"
                        rules={[{required: true, message: '请选择性别'}]}
                    >
                        <Select placeholder="请选择性别">
                            <Select.Option value="父">父</Select.Option>
                            <Select.Option value="母">母</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="品種"
                        name="breed"
                        rules={[{required: true, message: '请输入品种'}]}
                    >
                        <Input placeholder="请输入品种"/>
                    </Form.Item>

                    <Form.Item
                        label="色"
                        name="color"
                        rules={[{required: true, message: '请输入颜色'}]}
                    >
                        <Input placeholder="请输入颜色"/>
                    </Form.Item>

                    <Form.Item
                        label="誕生日"
                        name="birthday"
                        rules={[{required: true, message: '请选择出生日期'}]}
                    >
                        <DatePicker
                            style={{width: '100%'}}
                            placeholder="请选择出生日期"
                            format="YYYY-MM-DD"
                        />
                    </Form.Item>

                    <Form.Item
                        label="説明"
                        name="description"
                    >
                        <Input.TextArea rows={3} placeholder="请输入描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ParentManagement;