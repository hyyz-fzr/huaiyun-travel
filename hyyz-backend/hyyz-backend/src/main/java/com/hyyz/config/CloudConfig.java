package com.hyyz.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Slf4j
@Configuration
public class CloudConfig {

    @Bean
    public CommandLineRunner logDeploymentInfo(Environment env) {
        return args -> {
            String port = env.getProperty("server.port", "8080");
            String contextPath = env.getProperty("server.servlet.context-path", "");
            String activeProfile = env.getProperty("spring.profiles.active", "default");
            
            log.info("🚀 淮韵游踪后端服务启动成功!");
            log.info("📍 运行端口: {}", port);
            log.info("📍 上下文路径: {}", contextPath);
            log.info("📍 激活环境: {}", activeProfile);
            log.info("📍 数据库: {}", env.getProperty("spring.datasource.url"));
            log.info("📚 API文档: http://localhost:{}{}/swagger-ui.html", port, contextPath);
            log.info("💾 H2控制台: http://localhost:{}{}/h2-console", port, contextPath);
            
            // 检查云端环境
            if (System.getenv("RAILWAY_ENVIRONMENT") != null) {
                log.info("☁️  运行在Railway云端环境");
            }
            if (System.getenv("DATABASE_URL") != null) {
                log.info("🗄️  使用云端PostgreSQL数据库");
            }
        };
    }
}