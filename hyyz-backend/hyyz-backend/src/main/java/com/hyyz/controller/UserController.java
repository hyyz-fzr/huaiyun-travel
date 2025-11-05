package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.User;
import com.hyyz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/profile")
    public Result<User> getProfile() {
        User user = userService.getCurrentUser();
        return Result.success(user);
    }
    
    @PutMapping("/profile")
    public Result<User> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        User user = userService.updateProfile(request);
        return Result.success("资料更新成功", user);
    }
    
    @PutMapping("/password")
    public Result<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(request.getOldPassword(), request.getNewPassword());
        return Result.success("密码修改成功");
    }
    
    @PostMapping("/avatar")
    public Result<String> uploadAvatar(@RequestParam("avatar") MultipartFile file) {
        String avatarUrl = userService.uploadAvatar(file);
        return Result.success("头像上传成功", avatarUrl);
    }
    
    @GetMapping("/favorites")
    public Result<?> getFavorites() {
        // 实现获取用户收藏逻辑
        return Result.success();
    }
    
    @GetMapping("/posts")
    public Result<?> getMyPosts() {
        // 实现获取用户帖子逻辑
        return Result.success();
    }
    
    @GetMapping("/orders")
    public Result<?> getMyOrders() {
        // 实现获取用户订单逻辑
        return Result.success();
    }
    
    @GetMapping("/bookings")
    public Result<?> getMyBookings() {
        // 实现获取用户预订逻辑
        return Result.success();
    }
    
    // 请求对象
    @Data
    static class UpdateProfileRequest {
        private String realName;
        private String phone;
        private String location;
        private String bio;
        private String gender;
        private String birthday;
    }
    
    @Data
    static class ChangePasswordRequest {
        @NotBlank(message = "原密码不能为空")
        private String oldPassword;
        
        @NotBlank(message = "新密码不能为空")
        @Size(min = 6, message = "新密码长度不能少于6位")
        private String newPassword;
    }
}