package com.hyyz.service;

import com.hyyz.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface UserService {
    
    Map<String, Object> login(String username, String password);
    
    User register(String username, String email, String password, String realName, String phone);
    
    void logout();
    
    User getCurrentUser();
    
    User updateProfile(Long userId, String realName, String phone, String location, String bio, String gender, String birthday);
    
    void changePassword(Long userId, String oldPassword, String newPassword);
    
    String uploadAvatar(Long userId, MultipartFile file);
    
    Page<User> getUsers(int page, int size, String keyword);
    
    User updateUserStatus(Long userId, User.UserStatus status);
    
    User updateUserRole(Long userId, User.Role role);
    
    // 云端部署健康检查
    Map<String, Object> getSystemHealth();
}