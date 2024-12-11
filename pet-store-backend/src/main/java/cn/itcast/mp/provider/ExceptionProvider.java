package cn.itcast.mp.provider;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class ExceptionProvider {

    private static final Logger logger = LoggerFactory.getLogger(Exception.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        logger.error("全局异常捕获: {}", e.getMessage(), e);
        return ResponseEntity.status(500).body("服务器内部错误，请稍后重试！");
    }
}
