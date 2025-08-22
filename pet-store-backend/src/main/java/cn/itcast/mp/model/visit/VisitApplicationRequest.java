package cn.itcast.mp.model.visit;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VisitApplicationRequest {
    private String kittenName;
    private Long kittenId;
    private String visitorName;
    private String phone;
    private String email;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime visitDate;
    
    private Integer numberOfVisitors;
    private String transportation;
    private String needPickup;
    private String memo;
    
    // 申请时间（后端自动设置）
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime applicationTime;
}