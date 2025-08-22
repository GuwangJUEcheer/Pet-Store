package cn.itcast.mp.serviceImpl;

import cn.itcast.mp.model.visit.VisitApplicationRequest;
import cn.itcast.mp.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

	@Resource
	private JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String fromEmail;

	@Value("${email.to.address}")
	private String toEmail;

	@Override
	public void sendVisitApplicationEmail(VisitApplicationRequest request) {
		try {
			// 配置SSL属性
			configureSSLProperties();

			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

			// 设置申请时间
			request.setApplicationTime(LocalDateTime.now());

			// 设置邮件基本信息
			helper.setFrom(fromEmail);
			helper.setTo(toEmail);

			// 设置邮件主题（包含申请日期）
			String subject = String.format("【見学申請】%s - %s",
					request.getApplicationTime().format(DateTimeFormatter.ofPattern("yyyy年MM月dd日")),
					request.getKittenName());
			helper.setSubject(subject);

			// 设置邮件内容
			String emailContent = buildEmailContent(request);
			helper.setText(emailContent, false);

			// 发送邮件
			mailSender.send(message);
			log.info("Visit application email sent successfully for kitten: {}", request.getKittenName());

		} catch (Exception e) {
			log.error("Failed to send visit application email", e);
			throw new RuntimeException("メール送信に失敗しました", e);
		}
	}

	private String buildEmailContent(VisitApplicationRequest request) {
		StringBuilder content = new StringBuilder();

		content.append("🐾 DoriaPet 見学申し込み 🐾\n\n");

		// 申请时间
		content.append("【申請日時】\n");
		content.append(request.getApplicationTime().format(DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss")));
		content.append("\n\n");

		// 见学猫咪信息
		content.append("【見学希望の子猫】\n");
		content.append("名前：").append(request.getKittenName()).append("\n");
		content.append("ID：").append(request.getKittenId()).append("\n\n");

		// 申请人信息
		content.append("【申込者情報】\n");
		content.append("お名前：").append(request.getVisitorName()).append("\n");
		content.append("電話番号：").append(request.getPhone()).append("\n");
		content.append("メールアドレス：").append(request.getEmail()).append("\n\n");

		// 见学详情
		content.append("【見学詳細】\n");
		content.append("希望日時：").append(request.getVisitDate().format(DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm"))).append("\n");
		content.append("見学人数：").append(request.getNumberOfVisitors()).append("名\n");
		content.append("交通手段：").append(getTransportationText(request.getTransportation())).append("\n");
		content.append("送迎サービス：").append("yes".equals(request.getNeedPickup()) ? "必要" : "不要").append("\n\n");

		// 补充信息
		if (request.getMemo() != null && !request.getMemo().trim().isEmpty()) {
			content.append("【メモ・補足事項】\n");
			content.append(request.getMemo()).append("\n\n");
		}

		content.append("--------------------\n");
		content.append("このメールはDoriaPetの見学申し込みシステムから自動送信されました。\n");
		content.append("お客様への返信をお忘れなく！");

		return content.toString();
	}

	private String getTransportationText(String transportation) {
		switch (transportation) {
			case "car":
				return "お車でお越し";
			case "train":
				return "電車でお越し";
			case "pickup":
				return "お迎えサービス希望";
			case "other":
				return "その他";
			default:
				return transportation;
		}
	}

	private void configureSSLProperties() {
		try {
			if (mailSender instanceof JavaMailSenderImpl) {
				JavaMailSenderImpl mailSenderImpl = (JavaMailSenderImpl) mailSender;
				Properties props = mailSenderImpl.getJavaMailProperties();

				// SSL相关配置
				props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
				props.put("mail.smtp.ssl.protocols", "TLSv1.2");
				props.put("mail.smtp.auth", "true");
				props.put("mail.smtp.starttls.enable", "true");
				props.put("mail.smtp.starttls.required", "true");

				// 添加这些属性来解决SSL证书验证问题
				props.put("mail.smtp.ssl.checkserveridentity", "false");
				props.put("mail.smtp.ssl.trust", "*");

				mailSenderImpl.setJavaMailProperties(props);
				log.info("SSL properties configured for email sender");
			}
		} catch (Exception e) {
			log.warn("Failed to configure SSL properties, using default settings", e);
		}
	}
}