package cn.itcast.mp.controller;

import cn.itcast.mp.model.visit.VisitApplicationRequest;
import cn.itcast.mp.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Slf4j
@RestController
@RequestMapping("/visit")
public class VisitController {

    @Resource
    private EmailService emailService;

    @PostMapping("/apply")
    public ResponseEntity<?> submitVisitApplication(@RequestBody VisitApplicationRequest request) {
        try {
            log.info("Received visit application: {}", request);
            
            // 验证请求参数
            if (request == null || request.getVisitorName() == null || request.getEmail() == null) {
                return ResponseEntity.badRequest().body("必要な情報が不足しています");
            }
            
            // 发送邮件
            emailService.sendVisitApplicationEmail(request);
            
            return ResponseEntity.ok("見学申し込みを受け付けました");
        } catch (Exception e) {
            log.error("Error processing visit application", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("申し込み処理中にエラーが発生しました");
        }
    }
}