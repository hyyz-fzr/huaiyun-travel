package com.hyyz.service.impl;

import com.hyyz.entity.User;
import com.hyyz.repository.UserRepository;
import com.hyyz.service.UserService;
import com.hyyz.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    
    @Override
    public Map<String, Object> login(String username, String password) {
        log.info("用户登录尝试: {}", username);
        
        User user = userRepository.findByUsernameOrEmail(username)
                .orElseThrow(() -> {
                    log.warn("登录失败: 用户不存在 - {}", username);
                    return new RuntimeException("用户名或密码错误");
                });
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.warn("登录失败: 密码错误 - {}", username);
            throw new RuntimeException("用户名或密码错误");
        }
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            log.warn("登录失败: 账户状态异常 - {} - {}", username, user.getStatus());
            throw new RuntimeException("账户状态异常，请联系管理员");
        }
        
        // 更新最后登录时间
        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);
        
        log.info("用户登录成功: {}", username);
        
        // 生成token
        String token = jwtUtils.generateToken(user.getUsername());
        
        Map<String, Object> result = new HashMap<>();
        result.put("token", token);
        result.put("userInfo", user);
        
        return result;
    }
    
    @Override
    public User register(String username, String email, String password, String realName, String phone) {
        log.info("用户注册: {} - {}", username, email);
        
        // 检查用户名和邮箱是否已存在
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("用户名已存在");
        }
        
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("邮箱已被注册");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRealName(realName);
        user.setPhone(phone);
        user.setRole(User.Role.USER);
        user.setStatus(User.UserStatus.ACTIVE);
        
        User savedUser = userRepository.save(user);
        log.info("用户注册成功: {} - ID: {}", username, savedUser.getId());
        
        return savedUser;
    }
    
    @Override
    public void logout() {
        // JWT是无状态的，客户端删除token即可
        // 这里可以记录日志或处理其他清理工作
        log.info("用户退出登录");
    }
    
    @Override
    public User getCurrentUser() {
        String username = jwtUtils.getCurrentUsername();
        if (username == null) {
            throw new RuntimeException("用户未登录");
        }
        
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }
    
    @Override
    public User updateProfile(Long userId, String realName, String phone, String location, String bio, String gender, String birthday) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        if (realName != null) user.setRealName(realName);
        if (phone != null) user.setPhone(phone);
        if (location != null) user.setLocation(location);
        if (bio != null) user.setBio(bio);
        if (gender != null) user.setGender(gender);
        if (birthday != null) {
            user.setBirthday(LocalDateTime.parse(birthday));
        }
        
        return userRepository.save(user);
    }
    
    @Override
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("原密码错误");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        log.info("用户密码修改成功: {}", user.getUsername());
    }
    
    @Override
    public String uploadAvatar(Long userId, MultipartFile file) {
        // 简化实现 - 实际应该保存到云存储
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        // 生成虚拟头像URL
        String avatarUrl = "/uploads/avatars/" + System.currentTimeMillis() + ".jpg";
        user.setAvatar(avatarUrl);
        userRepository.save(user);
        
        log.info("用户头像上传成功: {} - {}", user.getUsername(), avatarUrl);
        return avatarUrl;
    }
    
    @Override
    public Page<User> getUsers(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.trim().isEmpty()) {
            return userRepository.findByUsernameContainingOrEmailContaining(keyword, keyword, pageable);
        }
        return userRepository.findAll(pageable);
    }
    
    @Override
    public User updateUserStatus(Long userId, User.UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        user.setStatus(status);
        return userRepository.save(user);
    }
    
    @Override
    public User updateUserRole(Long userId, User.Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        user.setRole(role);
        return userRepository.save(user);
    }
    
    @Override
    public Map<String, Object> getSystemHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("database", "Connected");
        health.put("usersCount", userRepository.count());
        health.put("environment", System.getenv("SPRING_PROFILES_ACTIVE"));
        health.put("cloudProvider", System.getenv("RAILWAY_ENVIRONMENT") != null ? "Railway" : "Local");
        return health;
    }
}