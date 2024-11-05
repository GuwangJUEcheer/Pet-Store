// News.tsx
import React from 'react';
import '../css/News.css';

const newsList = [
  { date: "2024-10-01", title: "新しい子猫が生まれました！", link: "/news/1" },
  { date: "2024-09-25", title: "ブリーダーの訪問情報更新", link: "/news/2" },
];

const News: React.FC = () => {
  return (
    <section className="news">
      <ul>
        {newsList.map((news, index) => (
          <li key={index}>
            <span className="date">{news.date}</span>
            <a href={news.link}>{news.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
