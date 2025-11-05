package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.User;
import com.hyyz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        Map<String, Object> authInfo = userService.login(request.getUsername(), request.getPassword());
        return Result.success("登录成功", authInfo);
    }
    
    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.register(request);
        return Result.success("注册成功", user);
    }
    
    @PostMapping("/logout")
    public Result<Void> logout() {
        userService.logout();
        return Result.success("退出成功");
    }
    
    // 请求对象
    @Data
    static class LoginRequest {
        @NotBlank(message = "用户名不能为空")
        private String username;
        
        @NotBlank(message = "密码不能为空")
        private String password;
    }
    
    @Data
    static class RegisterRequest {
        @NotBlank(message = "用户名不能为空")
        private String username;
        
        @Email(message = "邮箱格式不正确")
        @NotBlank(message = "邮箱不能为空")
        private String email;
        
        @NotBlank(message = "密码不能为空")
        @Size(min = 6, message = "密码长度不能少于6位")
        private String password;
        
        private String realName;
        private String phone;
    }
}