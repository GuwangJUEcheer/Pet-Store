import React, { useState } from "react";
import "../css/About.css";
import catteryIntro from "../images/cat4.jpg";
import catteryPhilosophy from "../images/cat5.jpg";
import visitationRoom from "../images/visitation.jpg";
import kittenKindergarten from "../images/kindergarten1.png";
// import kittenKindergartenImage2 from "../images/kindergarten2.png";
import momRoom from "../images/momroom.png";
import dadRoom from "../images/dadroom.png";
import birthingRoom from "../images/birthingroom.png";
import photoStudio from "../images/photostudio.jpg";
import catKitchen from "../images/catkitchen.jpg";
import catBathroom from "../images/catbathroom.png";
import service from "../images/service.jpg";

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <main className="content">
      <h1 className="section-title">ABOUT US</h1>

      {/* キャッテリ紹介 */}
      <section className="cattery-introduction">
        <h2 className="room-title">キャッテリ紹介</h2>
        <div className="room-section">
          <img
            src={catteryIntro}
            alt="Cattery Introduction"
            className="cattery-intro-image"
          />
          <div className="text-content">
            <p>
              弊社は、一般家庭の一軒家で、のびのびとストレスのかかりにくい環境の中で猫ちゃんのお世話をしています。
              猫ちゃんがより快適に過ごせるよう、最大限の力を注いで環境作りに努めています。"甘えん坊で人の方が受けとり方が大好き、可愛く健康な子"の無理のない繁殖に力を入れています。
            </p>
            <p>
              猫ちゃんを心から愛し、我が子のように可愛がってお世話をする事を前提とし、
              猫ちゃんについての知識や、育てるにあたって消費する時間やお金についての理解を持っている方、
              持って下さる方との出会いを強く願い、ご紹介をしております。
            </p>
          </div>
        </div>
      </section>

      {/* キャッテリの理念 */}
      <section className="cattery-philosophy">
        <h2 className="room-title">キャッテリの理念</h2>
        <div className="room-section">
          <div className="text-content">
            <p>
              私たちは、猫ちゃんを猫学的に、そして家族の一員として大切に育てていただくことを望んでおります。
            </p>
            <p>
              弊社では、見た目が美しく、大変良い性格で、骨格に異常がなく、健康的な「小さな短足ねこちゃん」の繁殖に努めています。
            </p>
            <p>
              TICA協会の標準と私たちの繊細な猫ちゃんに対してのこだわりを満たすことを目指しています。
            </p>
          </div>
          <img
            src={catteryPhilosophy}
            alt="Cattery Philosophy"
            className="philosophy-image"
          />
        </div>
      </section>

      {/* 見学室 */}
      <section className="visitation-room">
        <h2 className="room-title">見学室</h2>
        <div className="room-section">
          <img
            src={visitationRoom}
            alt="Visitation Room"
            className="visitation-room-image"
            onClick={() => openModal(visitationRoom)}
          />
          <div className="text-content">
            <p>
              見学室は、訪れるオーナー様に猫たちを安全かつ密接に観察する機会を提供する場所です。
              この場所では、猫とのインタラクションを通じて、その猫の性格や行動パターンをより詳しく観察することが可能です。
              遊びながら猫の反応を見ることで、その猫がどのような性格を持っているかが分かります、猫との共同生活がどのようなものかを想像しやすい環境にしています。
              見学室は、将来的に猫を家族に迎えたいと考えているオーナー様にとって、猫との相性を確かめる貴重な場となっています。
            </p>
          </div>
        </div>
      </section>

      {/* 子猫幼稚園 */}
      <section className="kitten-kindergarten">
        <h2 className="room-title">子猫幼稚園</h2>
        <div className="room-section">
          {/* 左侧文字 */}
          <div className="text-content">
            <p>
              子猫の部屋にも別々の部屋が設けられており、トイレの使い方がまだ完全に身についていない子猫や、
              他の猫との共存に慣れていない子猫が適応するための時間を確保しています。
            </p>
            <p>
              これにより、安全かつ自然に近い成長環境を確保できています。
              これらの環境により、猫ちゃん達がより多くの生活音に慣れるのを助けるだけでなく、遊びを通じて社会性を学び、
              群れの中によりよく溶け込むことができるようになります。
            </p>
            <p>
              小さな遊園地のようなもので、異なる年齢や体型の子達と一緒に遊び、一緒に成長することができます。
              子猫たちが社会化スキルを身につけ、健康的に成長するのを助け合っています。
            </p>
            <p>
              弊社では、それぞれの人懐っこく、おとなしい性格を目指し、性格形成に力をいれています。
              性格は生まれつきの要素もあるため、最初に猫のパパママを選ぶ段階から、
              特に性格が温和で愛情深い猫を選んでいます。
            </p>
            <p>
              子猫たちが積極的に人とのふれあいを楽しめるよう、日々の接触を大切にしています。
              また、さまざまな社会的状況に対応できるよう、社会化トレーニングも積極的に行っています。
              このようにして、子猫たちが安心して人と接することができるよう、温かく支援できる環境を提供しています。
              これにより、子猫たちは成長しても、親しみやすく、人との強い絆を築くことができるようになります。
            </p>
          </div>

          {/* 右侧图片 */}
          <div className="image-content">
            <img
              src={kittenKindergarten}
              alt="Kindergarten Room 1"
              className="kitten-kindergarten-image"
            />
          </div>
        </div>
      </section>

      {/* 妈妈的房间 */}
      <section className="mom-room">
        <h2 className="room-title">ママの部屋</h2>
        <div className="room-section">
          {/* 左侧图片 */}
          <div className="image-content">
            <img
              src={momRoom}
              alt="Mom's Room View 1"
              className="mom-room-image"
            />
          </div>

          {/* 右侧文字 */}
          <div className="text-content">
            <p>
              猫のママたちのために、私たちは2つの部屋を用意しています。
              これらの部屋はいつも開放されており、ママたちが自由に好きな場所へ行き来できるようにしています。
              また、家全体を自由に探索し、興味を持った場所で遊ぶことができます。
              このような活動は、彼女たちの活動量を増やすだけでなく、勇気と環境適応能力の向上にも寄与します。
            </p>
            <p>
              開放的で自由な環境で、ママたちは安全で愛情深いケアを受けていると感じつつ、好奇心を持続させることができます。
              家の温かさを感じながら、束縛されずに心身の健康を保ち、自然に近い行動を取ることができます。
            </p>
            <p>
              ママたちが日光浴を楽しめるよう、お部屋には大きな窓を2つ設置しています。
              これにより十分な自然光が部屋に入り、猫たちが健康的に過ごすことが可能です。
              窓からの眺めも彼女たちに刺激を提供し、心身の健康を支える重要な要素となっています。
            </p>
            <p>
              さらに、部屋には除湿機、空気清浄機、2台のエアコン、そしてお掃除ロボットを設置して、
              最適な環境を整えています。
              私たちは、ママたちが毎日を幸せに、安心して過ごせるようにすることを最大の目標としています。
              彼女たちが毎日快適に過ごせるよう、心からのサポートを提供しています。
            </p>
          </div>
        </div>
      </section>

      {/* 爸爸的房间 */}
      <section className="dad-room">
        <h2 className="room-title">パパの部屋</h2>
        <div className="room-section">
          {/* 左侧文字内容 */}
          <div className="text-content">
            <p>
              オス猫には、発情期に特有の行動が見られることがあります。
              これには、縄張り意識の強化が表れる尿でのマーキングや、オス同士の敵意による争いが含まれます。
              これらの行動は、猫が自己の領域を主張し、配偶者を得るための本能的な行動として現れますが、
              密集した環境下では他の猫との衝突を引き起こす可能性があります。
            </p>
            <p>
              そのため、弊社では、パパがストレスなく生活できるよう、各猫に独立した空間を確保しています。
              この独立した空間は、猫たちが安心して休息でき、自分のテリトリーを守ることができる場所として機能します。
              これにより、他の猫との不必要な接触を避け、争いが起こるリスクを減少させます。
            </p>
            <p>
              さらに、猫たちが適切に社会化するためには、計画的にオス猫を公共のエリアに出して遊ばせます。
              この時間は、ガラス越しあるいは他の猫との安全な交流を促進し、社会的なスキルを磨く機会を提供します。
              互いの存在を認識しながらも、安全距離を保つことで、衝突や争いを最小限に抑える効果も期待されます。
            </p>
            <p>
              このように、科学的な知見に基づきつつ、各猫の個性とニーズに注意を払いながら、
              猫たちが健康で社会的な環境で生活できるよう配慮しています。
            </p>
          </div>

          {/* 右侧图片内容 */}
          <div className="image-content">
            <img
              src={dadRoom}
              alt="Dad's Room View 1"
              className="dad-room-image"
            />
          </div>
        </div>
      </section>

      {/* 出产室 */}
      <section className="birthing-room">
        <h2 className="room-title">出産室</h2>
        <div className="room-section">
          {/* 左侧图片部分 */}
          <div className="image-content">
            <img
              src={birthingRoom}
              alt="Birthing Room View 1"
              className="birthing-room-image"
            />
          </div>

          {/* 右侧文字部分 */}
          <div className="text-content">
            <p>
              弊社では、妊娠後期に入ったママたちは、出産の準備のためにこのお部屋に移動します。
              出産室は、ママ達がリラックスし、快適に過ごせるように作られています。
              また、ママ達が安心して出産を迎えられるような環境にもなっています。
            </p>
            <p>
              順調な出産と子猫の健康を保障するために、動物ICUを設置しました。
              この部屋では、酸素供給が可能であり、温度と湿度を適切に保つことができます。
              これにより、生まれたばかりの子猫たちの状態をより安定させることが可能で、
              切迫した状況にも迅速に対応できるようにし、小さな命が最良のスタートを切れるよう、
              万全の体制を整えています。
            </p>
            <p>
              24時間体制の見守り
              <br />
              ・安全と健康を最優先に考え、出産室は24時間見守っています。
            </p>
            <p>
              静かで暖かい生活環境
              <br />
              ・出産室は、十分な自然光が入るような作りになっており、室内は非常に明るく暖かいです。
              また、静かな環境が保たれており、猫ちゃんのママ達がストレスを感じることなく、
              リラックスして過ごせます。
            </p>
            <p>
              出産前の120時間
              <br />
              ・出産を防ぐために、出産予定時刻の120時間前から、ママの状態を常に観察するためペット室を置いています。
              これにより、何か異常が見られた場合にはすぐに対応することができ、ママと子猫の健康を守るための適切なケアを提供することが可能です。
              ママが安全で健康的に出産を迎えられるよう、弊社では細心の注意を払っています。
            </p>
          </div>
        </div>
      </section>

      {/* 照片拍摄工作室 */}
      <section className="photo-studio">
        <h2 className="room-title">写真撮影スタジオ</h2>
        <div className="room-section">
          {/* 左侧文字内容 */}
          <div className="text-content">
            <p>
              写真撮影は、猫ちゃんの成長と健康状態を記録するための重要なものです。
              定期的に撮影することで、ゆったりとした生活の一部を写真に収め、猫ちゃん達の健康と成長を記録することができます。
            </p>
            <p>
              これらの写真では、弊社の愛情深い専門的な日々のケアの結果が現れるものでもあるため、
              ご家族様には安心していただけるかと思います。
            </p>
          </div>

          {/* 右侧图片内容 */}
          <div className="image-content">
            <img
              src={photoStudio}
              alt="Photo Studio"
              className="photo-studio-image"
            />
          </div>
        </div>
      </section>

      {/* 猫専用キッチン */}
      <section className="cat-kitchen">
        <h2 className="room-title">猫専用キッチン</h2>
        <div className="room-section">
          {/* 左侧图片内容 */}
          <div className="image-content">
            <img
              src={catKitchen}
              alt="Cat-Only Kitchen"
              className="cat-kitchen-image"
            />
          </div>

          {/* 右侧文字内容 */}
          <div className="text-content">
            <p>
              良い食生活は、猫ちゃんの健康的な生活の基盤であると私たちは強く思っております。
              その為常に最善を尽くしています。
            </p>
            <p>
              専門の栄養士ではありませんが、授業で学んだ知識を活用して、
              猫たちのために栄養豊富で美味しい食事を準備しています。
              猫たちが必要とする栄養をしっかりと取り入れながら、
              猫ちゃんたちが喜ぶ味も考慮に入れて、健康を支える美味しい食事を提供することを心がけています。
            </p>
          </div>
        </div>
      </section>

      {/* 猫洗澡间 */}
      <section className="cat-bathroom">
        <h2 className="room-title">猫 お風呂場</h2>
        <div className="room-section">
          {/* 左侧文字内容 */}
          <div className="text-content">
            <p>
              猫ちゃんのシャワー、長毛の毛玉取り、および不要な毛の除去を行います。
              毛が絡まるのを防ぎ、皮膚病のリスクを減らすのに役立ちます。
              また、余分な毛を取り除くことで、猫ちゃん自身がより快適に感じることができます。
            </p>
            <p>
              特に換毛期において重要です。この期間中に適切なグルーミングが行われないと、
              猫の消化器系に毛玉が形成される原因となり得ます。
              毛玉を猫ちゃんが舐め取った毛が胃に溜まってしまうことで発生し、
              時には健康問題を引き起こすことがあります。
            </p>
            <p>
              弊社では、これらのケアを行うことで、猫たちが健康で快適な生活を送ることを支援しています。
            </p>
          </div>

          {/* 右侧图片内容 */}
          <div className="image-content">
            <img
              src={catBathroom}
              alt="Cat Bathroom View 1"
              className="cat-bathroom-image"
            />
          </div>
        </div>
      </section>

      {/* 服务部分 */}
      <section className="services">
        <h2 className="room-title">サービス</h2>
        <div className="room-section">
          {/* 左侧图片 */}
          <div className="image-content">
            <img src={service} alt="Service" className="services-image" />
          </div>

          {/* 右侧文字 */}
          <div className="text-content">
            <ol>
              <li>
                <strong>子猫の成長手帳</strong>
                <br />
                初めて猫ちゃんを迎えるご家庭では、お世話の仕方が分からないなどに対する不安が生じるかと思います。
                そこで、出生情報、成長初期の写真、健康状態、飼育方法とケアの基本情報を詳しく記載した成長手帳をお渡しします。
                この手帳は、ご家族の皆様が猫ちゃんについてより良く理解し、お世話をするにあたっての助けとなることを目的としています。
              </li>
              <li>
                <strong>猫用の日用品</strong>
                <br />
                新しい環境に猫ちゃんがより早く慣れるように、各猫ちゃんの好みと必要に応じて日用品セットをお渡しします。
                セット内容は、おもちゃ、爪とぎ、猫用ベッドなど、私たちが厳選した高品質の商品です。
              </li>
              <li>
                <strong>お気に入りのご飯</strong>
                <br />
                美味しい食事は猫ちゃんの幸せにつながります。そこで、各猫ちゃんの好みに応じて、
                缶詰やフリーズドライ食品をお渡しします。新しいお家に行っても、美味しい食事を楽しんで欲しいという私たちの願いです。
              </li>
              <li>
                <strong>キャットフード（約2週間分）</strong>
                <br />
                お迎え日から慣れるまでの間の負担を軽減するために、約2週間分のキャットフードをお渡しします。
                食べ慣れているフードのため、猫ちゃんの好みをより深く理解する時間を取ることができます。
              </li>
              <li>
                <strong>様々な検査報告書</strong>
                <br />
                私たちは猫ちゃんの健康に重きを置き、新しい家族の元へ行く前に、総合的な健康検査を実施しています。
                これには、一般的な健康検査や親の遺伝病検査などが含まれます。
              </li>
              <li>
                <strong>終生相談サービス</strong>
                <br />
                私たちのサービスは、猫ちゃんが弊社を離れると同時に終わるわけではありません。
                健康や行動に関する問題、飼育アドバイスを継続的に提供しています。
              </li>
            </ol>
          </div>
        </div>
      </section>


      {/* 重要なお知らせ - サービス案内 */}
      <section className="important-notices">
        <h2 className="room-title">重要なお知らせ</h2>
        <div className="notices-grid">
          <div className="notice-card">
            <div className="notice-icon">🎁</div>
            <h3>5大特典サービス</h3>
            <p>ご成約のお客様限定の特別なサービスをご用意しております。詳細をご確認ください。</p>
            <a href="/services" className="notice-link">詳細を見る →</a>
          </div>
          
          <div className="notice-card">
            <div className="notice-icon">🏥</div>
            <h3>生体保証制度</h3>
            <p>子猫の健康を保証する充実した保証制度について詳しくご説明いたします。</p>
            <a href="/health-guarantee" className="notice-link">詳細を見る →</a>
          </div>
        </div>
      </section>

      {/* 模态框 */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Enlarged" className="modal-image" />
          </div>
        </div>
      )}
    </main>
  );
};

export default About;
