package cn.itcast.mp.controller;

import cn.itcast.mp.s3.S3Manager;
import cn.itcast.mp.service.KittenService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@CrossOrigin
public class UploadController {

	@Resource
	private S3Manager s3Manager;

	@Resource
	private KittenService kittenService;


}
