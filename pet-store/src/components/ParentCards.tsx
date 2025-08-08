import React, {useEffect, useState} from 'react';
import {Typography, Tag, Spin} from 'antd';
import {getParentsByKittenIdUsingGet} from '../api/parentController';
import dayjs from 'dayjs';
import '../css/parentCard.css'

const {Text} = Typography;

interface ParentCardsProps {
    kittenId: number;
}

const ParentCards: React.FC<ParentCardsProps> = ({kittenId}) => {
    const [parents, setParents] = useState<API.Parent[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (kittenId) {
            fetchParents();
        }
    }, [kittenId]);

    const fetchParents = async () => {
        setLoading(true);
        try {
            const response = await getParentsByKittenIdUsingGet({kittenId});
            setParents(response.data || []);
        } catch (error) {
            console.error('获取父母信息失败:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: 20}}>
                <Spin size="large"/>
            </div>
        );
    }

    if (parents.length === 0) {
        return (
            <div style={{padding: 20, textAlign: 'center'}}>
                <Text type="secondary">暂无父母信息</Text>
            </div>
        );
    }

    return (
        <div className="parent-cards-wrapper">
            <div className="parent-cards-grid">
                {parents.map((parent) => (
                    <div key={parent.id} className="parent-card-large">
                        <div className="parent-avatar-large">
                            {parent.imgUrl ? (
                                <img
                                    alt={parent.name}
                                    src={parent.imgUrl}
                                    className="parent-image-large"
                                />
                            ) : (
                                <div className="parent-placeholder-large">
                                    <Text type="secondary" style={{fontSize: 14}}>画像なし</Text>
                                </div>
                            )}
                        </div>

                        <div className="parent-info-large">
                            <div className="parent-name-row">
                                <Text strong className="parent-name-large">
                                    {parent.name}
                                </Text>
                                <Tag
                                    color={parent.gender === '父' ? '#108ee9' : '#f50'}
                                    className="parent-gender-tag"
                                >
                                    {parent.gender === '父' ? '🧔 パパ' : '👩 ママ'}
                                </Tag>
                            </div>

                            <div className="parent-details-large">
                                <div className="detail-row">
                                    <span className="detail-label">品種:</span>
                                    <span className="detail-value">{parent.breed || '-'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">色:</span>
                                    <span className="detail-value">{parent.color || '-'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">誕生日:</span>
                                    <span className="detail-value">
                                        {parent.birthday ? dayjs(parent.birthday).format('YYYY/MM/DD') : '-'}
                                    </span>
                                </div>
                            </div>

                            {parent.description && (
                                <div className="parent-description-large">
                                    {parent.description}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentCards;