package com.hyyz.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Slf4j
@Configuration
public class CloudDatabaseConfig {

    /**
     * 云端环境数据源配置
     * 自动从环境变量 DATABASE_URL 读取Railway提供的数据库连接
     */
    @Bean
    @Profile("prod")
    public DataSource cloudDataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl == null) {
            throw new IllegalStateException("云端环境需要设置 DATABASE_URL 环境变量");
        }
        
        log.info("🔗 配置云端数据库连接: {}", maskPassword(databaseUrl));
        
        // 解析Railway的数据库URL格式: postgresql://user:password@host:port/database
        return DataSourceBuilder.create()
                .url(convertToJdbcUrl(databaseUrl))
                .username(extractUsername(databaseUrl))
                .password(extractPassword(databaseUrl))
                .driverClassName("org.postgresql.Driver")
                .build();
    }
    
    private String convertToJdbcUrl(String railwayUrl) {
        // 转换格式: postgresql://user:password@host:port/database 
        // -> jdbc:postgresql://host:port/database
        String jdbcUrl = railwayUrl.replaceFirst("^postgresql://", "jdbc:postgresql://");
        // 移除用户名密码部分
        jdbcUrl = jdbcUrl.replaceFirst("//[^:]+:[^@]+@", "//");
        return jdbcUrl;
    }
    
    private String extractUsername(String railwayUrl) {
        // 从 postgresql://username:password@host:port/database 提取用户名
        String userInfo = railwayUrl.replaceFirst("^postgresql://", "").split("@")[0];
        return userInfo.split(":")[0];
    }
    
    private String extractPassword(String railwayUrl) {
        // 从 postgresql://username:password@host:port/database 提取密码
        String userInfo = railwayUrl.replaceFirst("^postgresql://", "").split("@")[0];
        String[] parts = userInfo.split(":");
        return parts.length > 1 ? parts[1] : "";
    }
    
    private String maskPassword(String url) {
        // 隐藏密码用于日志输出
        return url.replaceAll("://[^:]+:[^@]+@", "://***:***@");
    }
}