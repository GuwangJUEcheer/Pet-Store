import React, {useEffect, useState, useCallback} from 'react';
import {
    Upload,
    Image,
    Button,
    message,
    Spin,
    Empty,
    Space,
    Popconfirm,
    Card,
    Row,
    Col,
    Badge,
} from 'antd';
import {
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    UploadOutlined,
} from '@ant-design/icons';
import {
    getKittenPhotosUsingGet,
    uploadKittenPhotoUsingPost,
    deleteKittenPhotoUsingDelete,
    setPrimaryPhotoUsingPut,
    bulkUploadPhotosUsingPost,
    reorderKittenPhotosUsingPut,
    KittenPhoto,
} from '../api/kittenPhotoController';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import '../css/PhotoManager.css';

interface PhotoManagerProps {
    kittenId: number;
    onPhotosChange?: (photos: KittenPhoto[]) => void;
}

const PhotoCard: React.FC<{
    photo: KittenPhoto;
    onDelete: (photoId: number) => void;
    onSetPrimary: (photoId: number) => void;
}> = ({photo, onDelete, onSetPrimary}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: photo.id!});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                size="small"
                className="photo-card"
                cover={
                    <div style={{position: 'relative', height: 120}}>
                        <Image
                            src={photo.photoUrl}
                            alt={photo.fileName}
                            style={{
                                width: '100%',
                                height: 120,
                                objectFit: 'cover',
                            }}
                            preview={{
                                mask: <div>预览</div>,
                            }}
                        />
                        {photo.isPrimary && (
                            <Badge
                                count={<StarFilled style={{color: '#faad14'}}/>}
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                            />
                        )}
                    </div>
                }
                actions={[
                    <Button
                        key="primary"
                        type="text"
                        icon={photo.isPrimary ? <StarFilled/> : <StarOutlined/>}
                        onClick={() => onSetPrimary(photo.id!)}
                        title={photo.isPrimary ? '已是主图' : '设为主图'}
                        style={{color: photo.isPrimary ? '#faad14' : undefined}}
                    />,
                    <Popconfirm
                        key="delete"
                        title="确定删除这张照片吗？"
                        onConfirm={() => onDelete(photo.id!)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined/>}
                            danger
                            title="删除照片"
                        />
                    </Popconfirm>,
                ]}
            >
                <Card.Meta
                    title={photo.fileName}
                    description={`${((photo.fileSize || 0) / 1024).toFixed(1)}KB`}
                />
            </Card>
        </div>
    );
};

const PhotoManager: React.FC<PhotoManagerProps> = ({kittenId, onPhotosChange}) => {
    const [photos, setPhotos] = useState<KittenPhoto[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        void fetchPhotos();
    }, [kittenId]);

    const fetchPhotos = async () => {
        if (!kittenId) return;

        setLoading(true);
        try {
            const response = await getKittenPhotosUsingGet({kittenId});
            const photoList = response.data || [];
            setPhotos(photoList);
            onPhotosChange?.(photoList);
        } catch (error) {
            message.error('获取照片失败');
            console.error('获取照片失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadKittenPhotoUsingPost(
                {kittenId},
                {},
                file
            );
            message.success('照片上传成功');
            await fetchPhotos();
        } catch (error) {
            message.error('照片上传失败');
            console.error('照片上传失败:', error);
        } finally {
            setUploading(false);
        }
        return false; // 阻止默认上传行为
    };

    const handleBulkUpload = async (files: File[]) => {
        if (!files.length) return;

        setUploading(true);
        try {
            await bulkUploadPhotosUsingPost({kittenId}, {}, files);
            message.success(`成功上传 ${files.length} 张照片`);
            await fetchPhotos();
        } catch (error) {
            message.error('批量上传失败');
            console.error('批量上传失败:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (photoId: number) => {
        try {
            await deleteKittenPhotoUsingDelete({kittenId, photoId});
            message.success('照片删除成功');
            await fetchPhotos();
        } catch (error) {
            message.error('照片删除失败');
            console.error('照片删除失败:', error);
        }
    };

    const handleSetPrimary = async (photoId: number) => {
        try {
            await setPrimaryPhotoUsingPut({kittenId, photoId});
            message.success('主图设置成功');
            await fetchPhotos();
        } catch (error) {
            message.error('主图设置失败');
            console.error('主图设置失败:', error);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldIndex = photos.findIndex((photo) => photo.id === active.id);
            const newIndex = photos.findIndex((photo) => photo.id === over?.id);

            const newPhotos = arrayMove(photos, oldIndex, newIndex);
            setPhotos(newPhotos);

            // 调用重排序API
            const photoOrders = newPhotos.map((photo, index) => ({
                photoId: photo.id!,
                displayOrder: index
            }));

            reorderKittenPhotosUsingPut(
                {kittenId},
                {photoOrders}
            ).catch(async (error) => {
                console.error('重排序失败:', error);
                message.error('照片排序失败');
                // 恢复原来的顺序
                await fetchPhotos();
            });
        }
    }, [photos, kittenId]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="photo-manager">
                <div style={{marginBottom: 16}}>
                    <Space>
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={handleUpload}
                            disabled={uploading}
                        >
                            <Button icon={<UploadOutlined/>} loading={uploading}>
                                单张上传
                            </Button>
                        </Upload>

                        <Upload
                            accept="image/*"
                            multiple
                            showUploadList={false}
                            beforeUpload={async (file, fileList) => {
                                if (fileList.length === fileList.indexOf(file) + 1) {
                                    // 最后一个文件，开始批量上传
                                    await handleBulkUpload(fileList);
                                }
                                return false;
                            }}
                            disabled={uploading}
                        >
                            <Button icon={<UploadOutlined/>} loading={uploading}>
                                批量上传
                            </Button>
                        </Upload>
                    </Space>
                </div>

                <Spin spinning={loading}>
                    {photos.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="暂无照片，拖拽文件到这里或点击按钮上传"
                            style={{margin: '60px 0'}}
                        >
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={handleUpload}
                                disabled={uploading}
                            >
                                <Button type="primary" icon={<UploadOutlined/>}>
                                    上传第一张照片
                                </Button>
                            </Upload>
                        </Empty>
                    ) : (
                        <>
                            <p style={{color: '#666', marginBottom: 16}}>
                                拖拽照片可以调整顺序，点击星星设置主图
                            </p>
                            <SortableContext
                                items={photos.map(photo => photo.id!)}
                                strategy={rectSortingStrategy}
                            >
                                <Row gutter={[16, 16]}>
                                    {photos.map((photo) => (
                                        <Col xs={12} sm={8} md={6} lg={4} xl={3} key={photo.id}>
                                            <PhotoCard
                                                photo={photo}
                                                onDelete={handleDelete}
                                                onSetPrimary={handleSetPrimary}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </SortableContext>
                        </>
                    )}
                </Spin>
            </div>
        </DndContext>
    );
};

export default PhotoManager;