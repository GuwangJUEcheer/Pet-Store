package cn.itcast.mp.model;

import lombok.Data;

/**
 * Created by codedrinker on 2019/4/24.
 */
@Data
public class AuthorizeDVO {
    private String client_id;
    private String client_secret;
    private String code;
    private String redirect_uri;
    private String state;
}