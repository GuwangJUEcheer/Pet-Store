import React from "react";
import { Card, Row, Col, Table, Divider, Tag, Alert, Timeline } from "antd";
import { CreditCardOutlined, BankOutlined, DollarOutlined, WechatOutlined, CalendarOutlined, SafetyOutlined, HeartOutlined, EyeOutlined, PhoneOutlined, HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "../css/Buy.css";

const Buy: React.FC = () => {
  const paymentMethods = [
    { method: "現金払い", icon: <DollarOutlined />, note: "" },
    { method: "銀行振込", icon: <BankOutlined />, note: "paypay銀行" },
    { method: "現金書留", icon: <CreditCardOutlined />, note: "" },
    { method: "paypay", icon: <WechatOutlined />, note: "paypayに関連するwechatpay、alipayなど使えます。" }
  ];

  const deliveryMethods = [
    { method: "直接お迎え", fee: "送料は発生しません", note: "" },
    { method: "空輸（直行便）", fee: "15,000円（税込）～", note: "子猫の状態、時期、距離等によって可否・価格変わるためご相談ください" },
    { method: "陸送", fee: "5,000円（税込）～", note: "子猫の状態、時期、距離等によって可否・価格変わるためご相談ください" }
  ];

  return (
    <div className="buy-container">
      <div className="buy-header">
        <h1>🐱 ご購入について 🐱</h1>
        <p className="subtitle">子猫をご購入される際の流れをご案内いたします。</p>
      </div>

      <section className="buy-timeline-section">
        <div className="section-icon">📋</div>
        <h2>購入の流れ</h2>
        <p className="timeline-intro">
          当店では、お客様に安心して子猫をご購入いただけるよう、以下の手順を設けております：
        </p>
        
        <div className="purchase-timeline">
          <Timeline
            className="cute-timeline"
            items={[
              {
                color: '#ff69b4',
                dot: <HeartOutlined style={{ fontSize: '16px', color: '#ff69b4' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>子猫を選ぶ 🐱</h4>
                    <p>子猫の情報をご確認いただき、ご希望の子猫をお選びください。</p>
                    <div className="timeline-details">
                      <span>💕 お気に入りの子猫を見つけよう</span>
                    </div>
                  </div>
                ),
              },
              {
                color: '#52c41a',
                dot: <EyeOutlined style={{ fontSize: '16px', color: '#52c41a' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>見学予約 👀</h4>
                    <p>見学のお申し込みをいただき、実際に子猫とお会いください。</p>
                    <div className="timeline-details">
                      <span>🏠 実際にお会いして相性をチェック</span>
                    </div>
                  </div>
                ),
              },
              {
                color: '#1890ff',
                dot: <PhoneOutlined style={{ fontSize: '16px', color: '#1890ff' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>ご予約・お支払い 📞</h4>
                    <p>ご予約フォームまたはお電話にてご連絡し、予約金をお支払いください。</p>
                    <div className="timeline-details">
                      <span>💰 販売価格の30%以上の予約金</span>
                    </div>
                  </div>
                ),
              },
              {
                color: '#faad14',
                dot: <CalendarOutlined style={{ fontSize: '16px', color: '#faad14' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>お引き渡し準備 📅</h4>
                    <p>ワクチン接種完了後、お引き渡し日程を調整いたします。</p>
                    <div className="timeline-details">
                      <span>💉 健康診断・ワクチン接種完了</span>
                    </div>
                  </div>
                ),
              },
              {
                color: '#722ed1',
                dot: <HomeOutlined style={{ fontSize: '16px', color: '#722ed1' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>お引き渡し 🏠</h4>
                    <p>店舗にて直接お引き取り、または配送手続きを行います。</p>
                    <div className="timeline-details">
                      <span>🚚 直接お迎え・空輸・陸送から選択</span>
                    </div>
                  </div>
                ),
              },
              {
                color: '#eb2f96',
                dot: <CheckCircleOutlined style={{ fontSize: '16px', color: '#eb2f96' }} />,
                children: (
                  <div className="timeline-content">
                    <h4>アフターサポート ✨</h4>
                    <p>子猫に関するアフターサポートもご利用いただけます。</p>
                    <div className="timeline-details">
                      <span>🌟 生涯にわたるサポート体制</span>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      <Divider className="cute-divider" />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card className="info-card" title={<><CreditCardOutlined style={{marginRight: 8}} />支払い方法</>}>
            <div className="payment-methods">
              {paymentMethods.map((item, index) => (
                <div key={index} className="payment-item">
                  <div className="payment-header">
                    <span className="payment-icon">{item.icon}</span>
                    <span className="payment-method">{item.method}</span>
                  </div>
                  {item.note && <p className="payment-note">{item.note}</p>}
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="info-card" title={<><CalendarOutlined style={{marginRight: 8}} />引き渡し時期</>}>
            <div className="delivery-info">
              <Alert 
                message="推奨引き渡し時期" 
                description="生後約90日（第12週目、第三回目のワクチン接種完了後）" 
                type="info" 
                showIcon 
                style={{marginBottom: 16}}
              />
              <p>法律では最早で生後57日での販売が認められていますが、私たちは9週齢（63日目）頃に第二回目のワクチン接種を終えてから引き渡しをお勧めしています。</p>
              <p><strong>📅 猫のそれぞれの状況によって、引き渡し時期も異なるため、詳細は子猫の紹介をご覧ください。</strong></p>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider className="cute-divider" />

      <Card className="info-card full-width" title={<><SafetyOutlined style={{marginRight: 8}} />引き渡し方法・送料</>}>
        <Table 
          dataSource={deliveryMethods} 
          pagination={false}
          className="delivery-table"
        >
          <Table.Column title="引き渡し方法" dataIndex="method" key="method" 
            render={(text) => <Tag color="blue">{text}</Tag>}
          />
          <Table.Column title="送料" dataIndex="fee" key="fee" 
            render={(text) => <span className="fee-text">{text}</span>}
          />
          <Table.Column title="備考" dataIndex="note" key="note" />
        </Table>
        <div style={{marginTop: 16}}>
          <p>• 直接お迎えの場合、お引き取り日時を決定の上、お引き取りに来ていただきます。</p>
          <p>• 航空便の場合、一度ご見学いただいた後、到着日等打ち合わせの上、最寄りの空港でお引き取りいただきます。</p>
        </div>
      </Card>

      <Divider className="cute-divider" />

      <section className="reservation-section">
        <div className="section-icon">💰</div>
        <h2>予約金について</h2>
        <div className="reservation-content">
          <Alert 
            message="重要なお知らせ" 
            description="ご予約される前には、ご家庭の飼育環境や猫の飼育歴などに関する必要な事をお尋ねいたします。" 
            type="warning" 
            showIcon 
            style={{marginBottom: 20}}
          />
          
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="reservation-card">
                <h4>①基本予約金</h4>
                <p><strong>販売価格の30％以上</strong></p>
                <p>ご入金確認後、商談中として他の方へのご案内は致しません。</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="reservation-card">
                <h4>②見学予約金</h4>
                <p><strong>５万円</strong></p>
                <p>見学日程が未定だが押さえておきたい場合（10日間）</p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="reservation-card">
                <h4>③お預かり料金</h4>
                <p><strong>１日600円</strong></p>
                <p>3回目ワクチン接種後、お引き渡しまで14日以上の場合</p>
              </Card>
            </Col>
          </Row>

          <Alert 
            message="キャンセルについて" 
            description="お客様のご都合でキャンセルされる時には、いかなる理由によりましても、ご返金できません。" 
            type="error" 
            showIcon 
            style={{marginTop: 20}}
          />
        </div>
      </section>

      <section className="caution-section">
        <div className="section-icon">⚠️</div>
        <h2>注意事項</h2>
        <p>
          子猫の健康と安全を最優先に考え、以下の事項をご確認ください：
        </p>
        <ul>
          <li>生体販売のため、ご購入後の返品は原則お受けできません。</li>
          <li>健康診断書をお渡ししておりますので、必ずご確認ください。</li>
          <li>家族として迎え入れるための準備を事前に整えてください。</li>
          <li>仔猫の体調により、お引渡しが延期になる事もあります。</li>
          <li>体調不良などのやむを得ない理由により、お引渡しの出来ない状況になった場合は代猫による対応をさせて頂きます。</li>
        </ul>
      </section>

      <div className="buy-footer">
        <p>🌟 見学のお申し込みは、ある程度の購入の意志を持ってお願いいたします 🌟</p>
      </div>
    </div>
  );
};

export default Buy;
