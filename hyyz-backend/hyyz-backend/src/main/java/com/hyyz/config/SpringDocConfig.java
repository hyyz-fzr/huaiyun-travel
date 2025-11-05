package com.hyyz.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI hyyzOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("淮韵游踪 API文档")
                        .description("淮南文化数字传承平台后端API接口文档")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("淮韵游踪团队")
                                .email("contact@huaiyun.com")));
    }
}