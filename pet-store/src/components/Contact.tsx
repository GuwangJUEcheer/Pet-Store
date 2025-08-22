import React, { useState } from "react";
import "../css/Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("全てのフィールドを入力してください。");
      return;
    }

    setError("");

    // Send data to the backend (example implementation)
    try {
      const response = await fetch("send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError("メールの送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("エラーが発生しました。");
    }
  };

  return (
    <div className="contact-container">
      <h1>お問い合わせ</h1>
      <p className="subtitle">以下のフォームにご記入の上、送信してください。</p>
      {isSubmitted ? (
        <p className="success-message">メッセージが送信されました。ありがとうございます！</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">お名前</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="お名前を入力してください"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="メールアドレスを入力してください"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">件名</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="件名を入力してください"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">メッセージ</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="メッセージを入力してください"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            送信
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
