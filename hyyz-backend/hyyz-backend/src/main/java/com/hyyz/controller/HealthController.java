package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
public class HealthController {
    
    private final UserService userService;
    
    @GetMapping
    public Result<Map<String, Object>> healthCheck() {
        Map<String, Object> health = userService.getSystemHealth();
        return Result.success("淮韵游踪后端服务运行正常", health);
    }
    
    @GetMapping("/database")
    public Result<Map<String, Object>> databaseHealth() {
        Map<String, Object> health = userService.getSystemHealth();
        return Result.success("数据库连接正常", health);
    }
    
    @GetMapping("/cloud")
    public Result<Map<String, Object>> cloudInfo() {
        Map<String, Object> info = Map.of(
            "railwayEnvironment", System.getenv("RAILWAY_ENVIRONMENT"),
            "databaseUrl", System.getenv("DATABASE_URL") != null ? "配置正常" : "未配置",
            "profile", System.getenv("SPRING_PROFILES_ACTIVE"),
            "port", System.getenv("PORT")
        );
        return Result.success("云端环境信息", info);
    }
}