package com.hyyz.controller;

import com.hyyz.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {
    
    @GetMapping("/hello")
    public Result<String> hello() {
        return Result.success("Hello, 淮韵游踪!");
    }
    
    @GetMapping("/info")
    public Result<Map<String, Object>> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "淮韵游踪后端服务");
        info.put("version", "1.0.0");
        info.put("author", "淮韵游踪团队");
        info.put("description", "淮南文化数字传承平台");
        info.put("timestamp", System.currentTimeMillis());
        return Result.success(info);
    }
    
    @GetMapping("/health")
    public Result<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("database", "Connected");
        health.put("timestamp", System.currentTimeMillis());
        return Result.success(health);
    }
}