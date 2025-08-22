package cn.itcast.mp.service;

import cn.itcast.mp.model.visit.VisitApplicationRequest;

public interface EmailService {
    void sendVisitApplicationEmail(VisitApplicationRequest request);
}