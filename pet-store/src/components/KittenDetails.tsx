// KittenDetails.tsx
import React, {useEffect, useRef, useState} from "react";
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
    Collapse,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Radio,
    InputNumber,
    message
} from "antd";
import {LeftOutlined, RightOutlined, CalendarOutlined} from "@ant-design/icons";
import {getKittenByIdUsingGet} from "../api/kittenController";
import ParentCards from "./ParentCards";
import "../css/parentCard.css";
import "../css/PetStoreInfo.css";
import {
    getKittenPhotosUsingGet,
} from "../api/kittenPhotoController";
import {submitVisitApplicationUsingPost} from "../api/visitController";
const {Text, Paragraph} = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const KittenDetails: React.FC = () => {
    const params = useParams<{ id: string }>();
    const id = Number.parseInt(params?.id ?? "0", 10);
    const navigate = useNavigate();

    const [kitten, setKitten] = useState<API.Kitten>();
    const [loading, setLoading] = useState(false);
    const [kittenPhotos, setKittenPhotos] = useState<API.KittenPhoto[]>([]);

    // 见学申请相关状态
    const [isVisitModalVisible, setIsVisitModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const carouselRef = useRef<any>(null);
    const multiplePhotos = kittenPhotos.length > 1;

    // 状态标签颜色
    const getStatusColor = (status: string) => {
        switch (status) {
            case "予約受付中":
                return "green";
            case "予約済み":
                return "orange";
            default:
                return "default";
        }
    };


    // 加载数据（放进 useEffect 内部，避免依赖警告）
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!id || Number.isNaN(id)) return;
            setLoading(true);
            try {
                const [kittenRes, photosRes] = await Promise.all([
                    getKittenByIdUsingGet({id}),
                    getKittenPhotosUsingGet({kittenId: id}),
                ]);
                if (!mounted) return;
                setKitten(kittenRes.data);
                setKittenPhotos(photosRes.data || []);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        void load();
        return () => {
            mounted = false;
        };
    }, [id]);

    // 页面加载时滚动到顶部
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 见学申请相关函数
    const showVisitModal = () => {
        setIsVisitModalVisible(true);
        // 预填充小猫信息
        form.setFieldsValue({
            kittenName: kitten?.name,
            kittenId: id
        });
    };

    const handleVisitModalCancel = () => {
        setIsVisitModalVisible(false);
        form.resetFields();
    };

    const handleVisitSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            // 构建发送给后端的数据
            const requestData: API.VisitApplicationRequest = {
                kittenName: kitten?.name || '',
                kittenId: id,
                visitorName: values.visitorName,
                phone: values.phone,
                email: values.email,
                visitDate: values.visitDate?.format('YYYY-MM-DD HH:mm:ss') || '',
                numberOfVisitors: values.numberOfVisitors,
                transportation: values.transportation,
                needPickup: values.needPickup,
                memo: values.memo || ''
            };
            
            console.log('发送见学申请数据:', requestData);
            
            // 发送API请求
            const response = await submitVisitApplicationUsingPost(requestData);
            
            message.success('見学申し込みを送信しました！担当者より連絡いたします。');
            setIsVisitModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('见学申请发送失败:', error);
            message.error('送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
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

                <Row gutter={[32, 24]} style={{alignItems: "stretch"}}>
                    {/* 左：轮播图 */}
                    <Col xs={24} lg={12}>
                        <Card
                            title="小猫写真"
                            style={{
                                height: 600,
                                maxWidth: "100%",
                                background: "#fff",
                                borderRadius: 20,
                                border: "3px solid #f5f5f5",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            styles={{
                                header: {
                                    background:
                                        "linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)",
                                    borderBottom: "none",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: "17px 17px 0 0",
                                    fontSize: 18,
                                    fontFamily:
                                        "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive",
                                },
                                body: {
                                    height: "calc(100% - 57px)", // 头部约 57px
                                    padding: 0,
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                },
                            }}
                        >
                            {kittenPhotos.length > 0 ? (
                                <>
                                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                                        <Carousel
                                            ref={carouselRef}
                                            autoplay={multiplePhotos}
                                            autoplaySpeed={3000}
                                            dots={multiplePhotos}
                                            dotPosition="bottom"
                                            style={{height: '100%'}}
                                        >
                                            {kittenPhotos.map((photo, index) => (
                                                <div key={photo.id ?? index}>
                                                    <div
                                                        style={{
                                                            height: '520px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#fafafa',
                                                            borderRadius: '8px',
                                                            padding: '10px'
                                                        }}
                                                    >
                                                        <img
                                                            src={photo.photoUrl || ''}
                                                            alt={`${kitten?.name ?? 'kitten'} - ${index + 1}`}
                                                            style={{
                                                                height: '100%',
                                                                width: 'auto',
                                                                maxWidth: 'none',
                                                                objectFit: 'cover',
                                                                aspectRatio: '9/16',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                if (!photo.photoUrl) return;
                                                                // 创建一个Image组件来显示预览
                                                                const img = document.createElement('img');
                                                                img.src = photo.photoUrl;
                                                                img.style.maxWidth = '90vw';
                                                                img.style.maxHeight = '90vh';
                                                                img.style.objectFit = 'contain';

                                                                const modal = document.createElement('div');
                                                                modal.style.position = 'fixed';
                                                                modal.style.top = '0';
                                                                modal.style.left = '0';
                                                                modal.style.width = '100vw';
                                                                modal.style.height = '100vh';
                                                                modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
                                                                modal.style.display = 'flex';
                                                                modal.style.alignItems = 'center';
                                                                modal.style.justifyContent = 'center';
                                                                modal.style.zIndex = '9999';
                                                                modal.style.cursor = 'pointer';

                                                                modal.appendChild(img);
                                                                document.body.appendChild(modal);

                                                                modal.onclick = () => document.body.removeChild(modal);
                                                            }}
                                                            onError={() => console.log('图片加载失败:', photo.photoUrl)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>

                                    {/* 自定义左右箭头 */}
                                    {multiplePhotos && (
                                        <>
                                            <Button
                                                type="text"
                                                icon={<LeftOutlined/>}
                                                onClick={() => carouselRef.current?.prev()}
                                                style={{
                                                    position: "absolute",
                                                    left: 12,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    zIndex: 10,
                                                    background: "rgba(0,0,0,0.5)",
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            />
                                            <Button
                                                type="text"
                                                icon={<RightOutlined/>}
                                                onClick={() => carouselRef.current?.next()}
                                                style={{
                                                    position: "absolute",
                                                    right: 12,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    zIndex: 10,
                                                    background: "rgba(0,0,0,0.5)",
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                >
                                    <Text type="secondary">画像がありません</Text>
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* 右：信息卡片 */}
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <div style={{display: "flex", alignItems: "center", gap: 12}}>
                  <span
                      style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#fff",
                          fontFamily:
                              "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                  >
                    {kitten?.name ?? "未命名"}
                  </span>
                                    <Tag
                                        color={getStatusColor(kitten?.status || "")}
                                        style={{
                                            fontSize: 14,
                                            padding: "6px 12px",
                                            borderRadius: 16,
                                            fontWeight: "bold",
                                            border: "none",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        {kitten?.status || "-"}
                                    </Tag>
                                </div>
                            }
                            style={{
                                height: 600,
                                background: "#fff",
                                borderRadius: 20,
                                border: "3px solid #f5f5f5",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            styles={{
                                header: {
                                    background:
                                        "linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)",
                                    borderBottom: "none",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: "17px 17px 0 0",
                                },
                                body: {
                                    height: "calc(100% - 57px)",
                                    overflow: "auto",
                                    padding: 24,
                                },
                            }}
                        >
                            <div
                                style={{
                                    minHeight: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Descriptions
                                    column={1}
                                    size="middle"
                                    labelStyle={{
                                        fontWeight: "bold",
                                        color: "#666",
                                        fontFamily:
                                            "'MochiyPopOne', sans-serif, '可爱字体', 'Comic Sans MS', cursive",
                                        fontSize: 15,
                                    }}
                                    contentStyle={{
                                        color: "#333",
                                        fontWeight: 500,
                                        fontSize: 15,
                                    }}
                                >
                                    <Descriptions.Item label="性別">
                                        <Tag color={kitten?.gender === "男の子" ? "blue" : "pink"}>
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
                                        <Text strong style={{fontSize: 18, color: "#a7a88b"}}>
                                            {kitten?.price
                                                ? `¥${kitten.price.toLocaleString()}`
                                                : "-"}
                                        </Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="説明">
                                        <Paragraph ellipsis={{rows: 4, expandable: true}}>
                                            {kitten?.description ?? "現時点では説明文はありません。"}
                                        </Paragraph>
                                    </Descriptions.Item>
                                </Descriptions>

                                {/* 见学問い合わせ按钮 */}
                                <div style={{
                                    marginTop: 24,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: 16
                                }}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<CalendarOutlined />}
                                        onClick={showVisitModal}
                                        style={{
                                            background: "linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)",
                                            border: "none",
                                            borderRadius: 25,
                                            padding: "8px 32px",
                                            height: "auto",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            boxShadow: "0 4px 12px rgba(167, 168, 139, 0.3)",
                                            fontFamily: "'MochiyPopOne', sans-serif"
                                        }}
                                    >
                                        見学問い合わせ
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Divider style={{marginTop: "5vh"}}/>

                {/* 父母信息 */}
                <Row gutter={[24, 24]} style={{marginTop: 48}}>
                    <Col xs={24} lg={24}>
                        <div className="parent-info-section-fullwidth" style={{width: "100%"}}>
                            <h2 className="parent-info-title-cute">🐾✨ 父母情報 ✨🐾</h2>
                            <div className="parent-cards-container-flex">
                                <ParentCards kittenId={kitten?.id ?? 0}/>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* 宠物店服务信息 */}
                <div className="pet-store-info" style={{marginTop: "5vh"}}>
                    <Collapse className="pet-store-collapse">
                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">🎁</div>
                                    <div className="collapse-text">ご成約のお客様に限定サービス</div>
                                </div>
                            } 
                            key="services"
                        >
                            <div className="content-inner">
                                <div className="highlight-box">
                                    <strong>㊗️子猫の健やかな成長を願い5大特典㊗️</strong>
                                </div>
                                <ul className="benefits-list">
                                    <li>
                                        <strong>①ハンドブックの提供</strong><br/>
                                        当舎では、猫舎環境、猫舎理念、提供しているサービス、子猫の情報、そしてワクチン接種記録などを詳細に紹介したハンドブックをお渡ししています。新しい飼い主様に、私たちの猫舎と子猫について深く理解していただけるようサポートいたします。
                                    </li>
                                    <li>
                                        <strong>②猫の日常用品と自社ブランド製品の提供</strong><br/>
                                        当舎では、猫の日常用品に加え、自社ブランドの様々な製品も提供しております。子猫が好むおもちゃ、猫砂、猫ベッドなど、個々の猫の性格や好みに合わせた日常用品を用意しております。猫の快適な生活をサポートいたします。
                                    </li>
                                    <li>
                                        <strong>③子猫の好物の缶詰とフリーズドライフード</strong><br/>
                                        当舎では、各子猫の食欲に合わせて、好みの缶詰とフリーズドライフードを提供しております。子猫の年齢や健康状態に応じたバランスの取れた栄養豊富な食事を提供し、健やかな成長をサポートいたします。
                                    </li>
                                    <li>
                                        <strong>④2週間分のフードを無料サービス</strong><br/>
                                        当舎では、子猫が新しいお家に慣れる期間中に、2週間分のフードを無料で提供しております。新しい食事環境への順応を円滑に進めるため、しっかりとサポートいたします。
                                    </li>
                                    <li>
                                        <strong>⑤様々な健康診断報告書</strong><br/>
                                        子猫が新しいお家に移る際には、綿密に作成された健康診断報告書を提供しております。この報告書には、健康診断の結果、猫パルボウイルス感染症検査結果、検便報告書、血統書、両親の遺伝性疾患検査結果のコピーなどが含まれています。また、短足猫の場合はレントゲン写真も添付しています。これらの報告書は、子猫の健康状態に関する完全な記録を提供し、新しい飼い主の方々が安心して新しい家族をお世話することができるようにサポートいたします。私たちは最高品質のサービスを提供し、子猫たちの未来に健康と幸福をもたらすことに全力を注いでいます。
                                    </li>
                                </ul>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">🛡️</div>
                                    <div className="collapse-text">生体保証</div>
                                </div>
                            } 
                            key="guarantee"
                        >
                            <div className="content-inner">
                                <div className="guarantee-section">
                                    <h4>初めて、子猫の健康についての考え</h4>
                                    <p>子猫は生き物ですので、徹底管理していても絶対に安心ということは言えません。細菌、ウイルス、真菌、微生物が検査時に症状がなければ、引き渡し時に感染していない把握することが困難な場合があります。</p>
                                    <p>当キャッテリーは定期的に子猫や成猫の便検や各種検査を行い、法律で定められた年1回の健康診断やワクチン接種を厳守しています。お引き渡し前に、獣医に子猫の全身、糞及び各検査を検査させます。問題がなければ、お引き渡しができます。ただし、検便検査で陰性でも風邪の症状が出ていなくても100%を保証することは出来ません。お引き渡し後に症状が出た場合は獣医さんへ行き治療をして下さい。免責となります。</p>
                                </div>
                                
                                <h4>【病死について】</h4>
                                <p>お引き渡しから14日以内に万一当該保証対象猫が病死した場合、ペットの生体代金の全額返金または、当キャッテリー全額負担にて同種・同額程度の生体を提供致します。</p>
                                
                                <h4>【先天的疾患について】</h4>
                                <p>お引き渡しから30日以内に当該保証猫が先天性(心臓および脳)の病気で病死した場合、ペットの生体代金の全額返金または、当キャッテリー全額負担にて同種・同額程度の生体を提供致します。</p>
                                
                                <div className="warning-section">
                                    <p><strong>※上記のいずれの保証制度の場合にも、治療のための費用、獣医師などによる証明の為の費用、交通費、慰謝料は、保証の対象外とさせていただきます。御理解、ご了承をお願い致します。</strong></p>
                                    <p>また、オーナーさまの重過失や事故など(子猫が明らかに調子が悪いのに速やかに獣医師に診察を受けさせなかった場合・新鮮な水やネコ専用の適切な食事を与えなかった場合・事故などによる外傷・他)の場合、売り主の瑕疵担保責任に該当の場合には保証の対象外となりますので御注意下さい。</p>
                                    <p><strong>★原則として販売した生体の返品・交換・買い戻しは致しません。</strong></p>
                                </div>

                                <h4>◆生命保証に関して、適用外事項</h4>
                                <ul className="benefits-list">
                                    <li>①飼い主様の故意、過失および飼育上の問題に起因する死亡、病気ならびに盗難、事故、逸脱の場合。</li>
                                    <li>②伝染病予防ワクチンの接種を受けない場合。</li>
                                    <li>③売買契約時、飼養者が疾病、傷病を了解の上で購入された場合。</li>
                                    <li>④保証請求に際して虚偽の申告があった場合。</li>
                                    <li>⑤子猫の病気・死亡時、直ちに当方まで連絡がされなかった場合。</li>
                                    <li>⑥保証は代猫の提供を行うものであって、治療費の保証及び金銭による保証は致しておりません。</li>
                                    <li>⑦代猫に相当する猫がいない場合、出産状況によりお待ち頂く場合も御座います。但し、代猫紹介開始後、６ヶ月を代猫保証の期限とさせて頂きます。</li>
                                    <li>⑧子猫お渡し後、成長過程において生じた変化（噛み合わせ・毛色・サイズ・睾丸など）が生じた場合。</li>
                                    <li>⑨FIPにつきましては、コロナウイルスの突然変異でおこりうる病気の為、飼い主さまが悪い訳でもブリーダーが悪い訳でも無い為こちらでの保証はございません。</li>
                                </ul>

                                <p>当方は保障終了後も一カ月間、保証に関する調査権を有し、不正請求の事実が判明した時は代支給した猫の評価金額及びその調査・回収のために要した経費を飼い主様に対し請求できるものとします。</p>

                                <div className="highlight-box">
                                    <p>最後に、言いたいことがあります。 子猫をお引き渡し前に、すべての準備を行います。 当キャッテリーでは、子猫に 2 回のワクチン注射 と 3 回のレボリューションを行います。お引き渡しの数日前に、子猫は獣医による健康診断を受けます。獣医師による各種身体検査、検便、レントゲン（短足のみ）、猫パルボウイルス検査などの健康診断を受けます。</p>
                                </div>

                                <h4>お引き渡し際に書類明細書</h4>
                                <ul className="benefits-list">
                                    <li>1.生体契約書</li>
                                    <li>2.ワクチン接種証明書（二回）</li>
                                    <li>3.マイクロチップ接種証明書</li>
                                    <li>4.両親遺伝子検査証明書（コピー件）</li>
                                    <li>5.レントゲン検査二枚　診断書（短足のみ）</li>
                                    <li>6.健康診断書①全部で15項目②検便③パルボウイルス検査</li>
                                </ul>

                                <p><strong>子猫が10年以上健康にあなたと一緒にいるために、最初から最高の保証を提供します。</strong></p>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">📜🏆</div>
                                    <div className="collapse-text">血統証明書類</div>
                                </div>
                            } 
                            key="pedigree"
                        >
                            <div className="content-inner">
                                <ul className="benefits-list">
                                    <li>
                                        <strong>TICA</strong><br/>
                                        当舎はTICAとその傘下のCPA協会に登録しています。通常、去勢手術後（去勢証明書を提供）にCPAの血統書を申請し、子猫の飼い主に無料で郵送いたします。また、希望される場合は有料でTICAの血統書を申請することも可能です。
                                    </li>
                                    <li>
                                        <strong>CPA</strong><br/>
                                        当舎はTICAとその傘下のCPA協会に登録しています。通常、去勢手術後（去勢証明書を提供）にCPAの血統書を申請し、子猫の飼い主に無料で郵送いたします。また、希望される場合は有料でTICAの血統書を申請することも可能です。
                                    </li>
                                </ul>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">🚚✈️</div>
                                    <div className="collapse-text">引き渡し方法・送料</div>
                                </div>
                            } 
                            key="delivery"
                        >
                            <div className="content-inner">
                                <div className="table-container">
                                    <table className="cute-table">
                                        <thead>
                                            <tr>
                                                <th>引き渡し方法</th>
                                                <th>送料</th>
                                                <th>備考</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>直接お迎え</td>
                                                <td>送料は発生しません</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>空輸（直行便）</td>
                                                <td>15,000円（税込）～</td>
                                                <td>子猫の状態、時期、距離等によって可否・価格変わるためご相談ください</td>
                                            </tr>
                                            <tr>
                                                <td>陸送</td>
                                                <td>5,000円（税込）～</td>
                                                <td>子猫の状態、時期、距離等によって可否・価格変わるためご相談ください</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="benefits-list">
                                    <li>直接お迎えの場合、お引き取り日時を決定の上、お引き取りに来ていただきます。</li>
                                    <li>航空便の場合、一度ご見学いただいた後、到着日等打ち合わせの上、最寄りの空港でお引き取りいただきます。</li>
                                </ul>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">⏰📅</div>
                                    <div className="collapse-text">引き渡し時期</div>
                                </div>
                            } 
                            key="timing"
                        >
                            <div className="content-inner">
                                <p>ご購入お申込み後、ご入金が確認出来次第、ご希望の引き渡し方法・日時にお引き渡しいたします。</p>
                                <div className="highlight-box">
                                    <p>当舎では、子猫が引き渡し時期として、生後約90日（つまり第12週目、第三回目のワクチン接種完了後）を推奨しています。法律では最早で生後57日での販売が認められていますが、私たちは9週齢（63日目）頃に第二回目のワクチン接種を終えてから引き渡しをお勧めしています。猫のそれぞれの状況によって、引き渡し時期も異なるため、詳細は子猫の紹介をご覧ください。</p>
                                </div>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">💰💳</div>
                                    <div className="collapse-text">支払い方法</div>
                                </div>
                            } 
                            key="payment"
                        >
                            <div className="content-inner">
                                <div className="table-container">
                                    <table className="cute-table">
                                        <thead>
                                            <tr>
                                                <th>支払い方法</th>
                                                <th>備考</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>現金払い</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>銀行振込</td>
                                                <td>paypay銀行</td>
                                            </tr>
                                            <tr>
                                                <td>現金書留</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>paypay</td>
                                                <td>paypayに関連するwechatpay、alipayなど使えます。</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">💎💰</div>
                                    <div className="collapse-text">予約金</div>
                                </div>
                            } 
                            key="reservation"
                        >
                            <div className="content-inner">
                                <p>ご予約される前には、ご家庭の飼育環境や猫の飼育歴などに関する必要な事をお尋ねいたします。</p>
                                
                                <div className="price-highlight">
                                    <h4>①ご予約金として、販売価格の30％以上のご入金をお願いします。</h4>
                                    <p>ご入金確認後　商談中という事で他の方へのご案内は致しません。</p>
                                    <p><strong>お客様のご都合でキャンセルされる時には、いかなる理由によりましても、ご返金できません。</strong></p>
                                </div>

                                <ul className="benefits-list">
                                    <li>②見学される日にちが　今は決まらず　でも押さえて置いて欲しいという　強い希望があれば１０日間位であれば商談中ということで、他の方にご案内は致しませんので、この場合も、内入のご予約金をお振込み下さい【５万円】</li>
                                    <li>購入の意志がある上での　お申し込みという前提なので、見学事体キャンセルになったり、見学後キャンセルになった場合のご返金も致しかねます。他のお客様へのご紹介機会を逸することになるため　ご了承ください。</li>
                                    <li>見学後　ご契約となります。</li>
                                    <li>③仔猫の引渡し時期までに、暫く期間がある場合は、別途お預かり金を頂く場合があります。3回目ワクチン接種しましたあとで、お客様のご都合によりお引き渡しまでに14日（2週間）以上の日数を要する場合は15日以降別途、１日につき600円のお預かり料金が発生いたします。</li>
                                    <li>④仔猫引渡しの１週間前までの決済、遅くとも当日には、全額のお支払いが必須です。</li>
                                </ul>

                                <div className="warning-section">
                                    <p><strong>上記　いずれの場合のキャンセルにつきましても、ご返金は致し兼ねます。</strong></p>
                                    <p>見学のお申し込みは、ある程度の購入の意志を持ってお願いいたします。</p>
                                    <p>ご予約金の振込　確認をもちまして、仮受付、商談中とします。</p>
                                    <p>お問い合わせのやり取りだけによる　仔猫の確保はできませんので、宜しくお願いいたします。</p>
                                    <p>母猫と離れても安心して生活のできる状況になってからのワクチン接種とお引越しになります</p>
                                    <p>仔猫の体調により　お引渡しが延期になる事もあります</p>
                                    <p>ご予約頂いた仔猫は　お引き渡しの日まで適切にお預かりいたしますが　体調不良などのやむ負えない理由により　お引渡しの出来ない状況になった場合は代猫による対応をさせて頂きます</p>
                                </div>
                            </div>
                        </Panel>

                        <Panel 
                            header={
                                <div className="collapse-header-content">
                                    <div className="collapse-icon">💉🏥</div>
                                    <div className="collapse-text">ワクチンについて</div>
                                </div>
                            } 
                            key="vaccine"
                        >
                            <div className="content-inner">
                                <div className="vaccine-schedule">
                                    <h4>私たちのワクチン接種は、2024年のWSAVA最新ワクチン接種ガイドラインに基づいています。</h4>
                                    <ul>
                                        <li>生後6-8週で最初のワクチンを接種</li>
                                        <li>3-4週間隔で第二回接種</li>
                                        <li>再度3-4週間隔で第三回接種</li>
                                        <li>6-12ヶ月齢の間にもう一度接種</li>
                                        <li>その後は3年ごとに一度接種</li>
                                    </ul>
                                    <p><strong>このスケジュールにより、子猫の健康を最適に保つことができます。</strong></p>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                {/* 见学問い合わせ按钮 - 页面底部 */}
                <div style={{
                    marginTop: '6vh',
                    marginBottom: '4vh',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0 20px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        borderRadius: '20px',
                        padding: '32px 40px',
                        boxShadow: '0 8px 32px rgba(167, 168, 139, 0.15)',
                        border: '2px solid #a7a88b20',
                        textAlign: 'center',
                        maxWidth: '600px',
                        width: '100%'
                    }}>
                        <div style={{
                            marginBottom: '16px',
                            color: '#a7a88b',
                            fontSize: '16px',
                            fontWeight: '500',
                            fontFamily: "'MochiyPopOne', sans-serif"
                        }}>
                            {kitten?.name}ちゃんに会いませんか？
                        </div>
                        <div style={{
                            marginBottom: '24px',
                            color: '#666',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            実際に見学していただくことで、{kitten?.name}ちゃんの<br/>
                            可愛らしさや性格をより深く知っていただけます
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon={<CalendarOutlined />}
                            onClick={showVisitModal}
                            style={{
                                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '12px 40px',
                                height: 'auto',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 6px 20px rgba(255, 154, 158, 0.4)',
                                fontFamily: "'MochiyPopOne', sans-serif",
                                transition: 'all 0.3s ease',
                                color: '#fff'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 154, 158, 0.6)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, #ff8a95 0%, #fec5eb 50%, #fec5eb 100%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 154, 158, 0.4)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
                            }}
                        >
                            🐾 見学のお申し込み 🐾
                        </Button>
                    </div>
                </div>

                {/* 见学申请Modal */}
                <Modal
                    title={
                        <div style={{
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#a7a88b',
                            fontFamily: "'MochiyPopOne', sans-serif"
                        }}>
                            🐾 見学申し込み 🐾
                        </div>
                    }
                    open={isVisitModalVisible}
                    onCancel={handleVisitModalCancel}
                    footer={null}
                    width={600}
                    centered
                    destroyOnClose
                    styles={{
                        header: {
                            borderBottom: '2px solid #f0f0f0',
                            paddingBottom: '16px'
                        }
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleVisitSubmit}
                        style={{ marginTop: 20 }}
                    >
                        {/* 见学猫咪信息 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            padding: '20px',
                            borderRadius: '16px',
                            marginBottom: '24px',
                            border: '2px solid #a7a88b20',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}>
                            {/* 小猫缩略图 */}
                            <div style={{
                                position: 'relative',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '3px solid #fff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    background: '#f0f0f0'
                                }}>
                                    <img
                                        src={kitten?.imgUrl || (kittenPhotos.length > 0 ? kittenPhotos[0].photoUrl : '')}
                                        alt={kitten?.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (nextElement) {
                                                nextElement.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div style={{
                                        display: 'none',
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        color: '#ccc'
                                    }}>
                                        🐱
                                    </div>
                                </div>
                                {/* 可爱装饰 */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    boxShadow: '0 2px 6px rgba(255, 154, 158, 0.4)'
                                }}>
                                    💕
                                </div>
                            </div>
                            
                            {/* 猫咪信息 */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    margin: 0,
                                    color: '#a7a88b',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    fontFamily: "'MochiyPopOne', sans-serif"
                                }}>
                                    見学希望の子猫ちゃん
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: '4px'
                                }}>
                                    {kitten?.name}
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: '12px',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    {kitten?.gender && (
                                        <Tag 
                                            color={kitten.gender === "男の子" ? "blue" : "pink"}
                                            style={{ fontSize: '10px', padding: '2px 6px', margin: 0 }}
                                        >
                                            {kitten.gender}
                                        </Tag>
                                    )}
                                </p>
                            </div>
                        </div>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="お名前"
                                    name="visitorName"
                                    rules={[{ required: true, message: 'お名前を入力してください' }]}
                                >
                                    <Input 
                                        placeholder="お名前をご入力ください"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="連絡先電話番号"
                                    name="phone"
                                    rules={[{ required: true, message: '電話番号を入力してください' }]}
                                >
                                    <Input 
                                        placeholder="090-1234-5678"
                                        style={{ borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="メールアドレス"
                            name="email"
                            rules={[
                                { required: true, message: 'メールアドレスを入力してください' },
                                { type: 'email', message: '正しいメールアドレスを入力してください' }
                            ]}
                        >
                            <Input 
                                placeholder="example@email.com"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="見学希望日時"
                                    name="visitDate"
                                    rules={[{ required: true, message: '見学希望日時を選択してください' }]}
                                >
                                    <DatePicker
                                        showTime
                                        placeholder="日時を選択してください"
                                        style={{ width: '100%', borderRadius: '8px' }}
                                        format="YYYY年MM月DD日 HH:mm"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="見学人数"
                                    name="numberOfVisitors"
                                    rules={[{ required: true, message: '見学人数を入力してください' }]}
                                    initialValue={1}
                                >
                                    <InputNumber
                                        min={1}
                                        max={10}
                                        placeholder="人数"
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="交通手段"
                                    name="transportation"
                                    rules={[{ required: true, message: '交通手段を選択してください' }]}
                                >
                                    <Select
                                        placeholder="交通手段を選択"
                                        style={{ borderRadius: '8px' }}
                                    >
                                        <Option value="car">お車でお越し</Option>
                                        <Option value="train">電車でお越し</Option>
                                        <Option value="pickup">お迎えサービス希望</Option>
                                        <Option value="other">その他</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="送迎サービス"
                                    name="needPickup"
                                    initialValue="no"
                                >
                                    <Radio.Group>
                                        <Radio value="yes">必要</Radio>
                                        <Radio value="no">不要</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="メモ・補足事項"
                            name="memo"
                        >
                            <TextArea
                                rows={4}
                                placeholder="ご質問やご要望などがございましたらご記入ください"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                                <Button
                                    onClick={handleVisitModalCancel}
                                    size="large"
                                    style={{
                                        borderRadius: '25px',
                                        padding: '8px 24px',
                                        height: 'auto'
                                    }}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmitting}
                                    size="large"
                                    style={{
                                        background: 'linear-gradient(90deg, #a7a88b 0%, #d4af7a 100%)',
                                        border: 'none',
                                        borderRadius: '25px',
                                        padding: '8px 32px',
                                        height: 'auto',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 12px rgba(167, 168, 139, 0.3)'
                                    }}
                                >
                                    申し込み送信
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

            </Spin>
        </div>
    );
};

export default KittenDetails;
