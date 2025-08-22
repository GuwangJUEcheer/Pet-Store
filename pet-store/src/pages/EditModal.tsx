import React, {useEffect, useState} from 'react';
import {Modal, Upload, Form, Input, message, Flex, Select, DatePicker, InputNumber} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {
    changeKittenPhotoUsingPost,
    getKittenByIdUsingGet,
    updateKittenUsingPost,
    addKittenUsingPost
} from "../api/kittenController";
import {getAllParentsUsingGet, getParentsByKittenIdUsingGet} from "../api/parentController";
import dayjs from 'dayjs';

interface EditModalProps {
    isOpen: boolean;
    close: () => void;
    id?: number | undefined; // 可选，新增时不传
    onSuccess: () => void;
    mode?: 'add' | 'edit'; // 模式：新增或编辑
}

const EditModal: React.FC<EditModalProps> = ({isOpen, close, id, onSuccess, mode = 'edit'}) => {
    const [visible, setVisible] = useState(isOpen);
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [parents, setParents] = useState<API.Parent[]>([]);
    const [currentParents, setCurrentParents] = useState<{ fatherId?: number, motherId?: number }>({});

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setFileList([]);
        setImageUrl('');
        setSelectedImageFile(null);
        setCurrentParents({});
        close();
    };

    useEffect(() => {
        setVisible(isOpen);
        if (isOpen) {
            loadParents();
            if (mode === 'edit' && id) {
                loadKittenData();
            } else if (mode === 'add') {
                // 新增模式，清空表单和图片
                form.resetFields();
                setImageUrl('');
                setSelectedImageFile(null);
                setCurrentParents({});
            }
        }
    }, [isOpen, id, mode]);

    const loadParents = async () => {
        try {
            const response = await getAllParentsUsingGet();
            setParents(response.data || []);
        } catch (error) {
            message.error('加载父母数据失败');
        }
    };

    const loadKittenData = async () => {
        try {
            let paramId: number
            if (id) {
                paramId = id;
            } else {
                return;
            }

            const response = await getKittenByIdUsingGet({id: paramId});
            const kittenData = response.data;

            // 填充表单数据
            form.setFieldsValue({
                name: kittenData.name,
                price: kittenData.price,
                gender: kittenData.gender,
                color: kittenData.color,
                birthday: kittenData.birthday ? dayjs(kittenData.birthday) : null,
                status: kittenData.status,
                description: kittenData.description
            });

            // 设置图片URL
            if (kittenData.imgUrl) {
                setImageUrl(kittenData.imgUrl);
            }

            // 加载父母信息
            const parentsResponse = await getParentsByKittenIdUsingGet({kittenId: paramId});
            const kittenParents = parentsResponse.data || [];
            const father = kittenParents.find(p => p.gender === '父');
            const mother = kittenParents.find(p => p.gender === '母');

            const parentIds = {
                fatherId: father?.id,
                motherId: mother?.id
            };
            setCurrentParents(parentIds);

            // 设置表单的父母字段
            form.setFieldsValue({
                ...form.getFieldsValue(),
                fatherId: parentIds.fatherId,
                motherId: parentIds.motherId
            });
        } catch (error) {
            message.error('加载小猫数据失败');
        }
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const values = await form.validateFields();

            // 准备数据
            const formData = {
                name: values.name,
                price: values.price,
                gender: values.gender,
                color: values.color,
                birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
                status: values.status,
                description: values.description,
                fatherId: values.fatherId,
                motherId: values.motherId
            };
            if (mode === 'edit' && id) {
                // 编辑模式
                const updateData = {...formData, id: id};
                await updateKittenUsingPost(updateData);
                message.success('小猫信息更新成功！');
            } else if (mode === 'add') {
                // 新增模式
                await addKittenUsingPost(formData, {}, selectedImageFile || undefined);
                message.success('小猫添加成功！');
            }

            handleCancel();
            onSuccess();
        } catch (error) {
            console.log('操作失败:', error);
            message.error(mode === 'edit' ? '更新失败，请重试' : '添加失败，请重试');
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleUpload = async ({file}: any) => {
        try {
            setLoading(true);

            if (mode === 'edit' && id) {
                // 编辑模式：直接上传到服务器
                const response = await changeKittenPhotoUsingPost({id}, {}, file);
                setImageUrl(response.data);
            } else if (mode === 'add') {
                // 新增模式：暂存文件，预览图片
                setSelectedImageFile(file);
                const reader = new FileReader();
                reader.onload = () => setImageUrl(reader.result as string);
                reader.readAsDataURL(file);
            }
        } catch (err) {
            message.error("图片处理失败");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title={mode === 'add' ? "新增小猫" : "小猫情报编辑"}
                open={visible}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="提交"
                width="90%"
                style={{maxWidth: '600px'}}
                confirmLoading={confirmLoading}
            >
                {/* 文件上传区域 */}
                <Flex gap="middle" wrap>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        customRequest={handleUpload}
                        maxCount={1}
                        showUploadList={false}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                    </Upload>
                </Flex>
                {/* 表单区域 */}
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="名前"
                        name="name"
                        rules={[{required: true, message: '请输入小猫名字'}]}
                    >
                        <Input placeholder="请输入小猫名字"/>
                    </Form.Item>

                    <Form.Item
                        label="価格"
                        name="price"
                        rules={[{required: true, message: '请输入价格'}]}
                    >
                        <InputNumber
                            style={{width: '100%'}}
                            placeholder="请输入价格"
                            min={0}
                            precision={2}
                            formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={((value: string) => {
                                const cleaned = value?.replace(/¥\s?|(,*)/g, '') || '0';
                                return parseFloat(cleaned) || 0;
                            }) as any}
                        />
                    </Form.Item>

                    <Form.Item
                        label="性別"
                        name="gender"
                        rules={[{required: true, message: '请选择性别'}]}
                    >
                        <Select placeholder="请选择性别">
                            <Select.Option value="男の子">男の子</Select.Option>
                            <Select.Option value="女の子">女の子</Select.Option>
                        </Select>
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
                        label="ステータス"
                        name="status"
                        rules={[{required: true, message: '请选择状态'}]}
                    >
                        <Select placeholder="请选择状态">
                            <Select.Option value="予約受付中">予約受付中</Select.Option>
                            <Select.Option value="相談中">相談中</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="説明"
                        name="description"
                    >
                        <Input.TextArea rows={3} placeholder="请输入描述"/>
                    </Form.Item>

                    <Form.Item
                        label="父親"
                        name="fatherId"
                    >
                        <Select
                            placeholder="请选择父亲"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {parents
                                .filter(parent => parent.gender === '父')
                                .map(parent => (
                                    <Select.Option key={parent.id} value={parent.id} label={parent.name}>
                                        {parent.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="母親"
                        name="motherId"
                    >
                        <Select
                            placeholder="请选择母亲"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {parents
                                .filter(parent => parent.gender === '母')
                                .map(parent => (
                                    <Select.Option key={parent.id} value={parent.id} label={parent.name}>
                                        {parent.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditModal;
