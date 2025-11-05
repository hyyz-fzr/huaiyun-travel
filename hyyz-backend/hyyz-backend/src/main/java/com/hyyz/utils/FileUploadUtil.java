package com.hyyz.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileUploadUtil {
    
    @Value("${app.upload.path}")
    private String uploadPath;
    
    public String uploadFile(MultipartFile file) throws IOException {
        return saveFile(file, "files");
    }
    
    public String uploadImage(MultipartFile image) throws IOException {
        // 验证图片类型
        String contentType = image.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("只能上传图片文件");
        }
        
        return saveFile(image, "images");
    }
    
    public List<String> uploadMultipleFiles(MultipartFile[] files) throws IOException {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileUrl = uploadFile(file);
            fileUrls.add(fileUrl);
        }
        return fileUrls;
    }
    
    private String saveFile(MultipartFile file, String subDir) throws IOException {
        // 创建上传目录
        Path uploadDir = Paths.get(uploadPath, subDir);
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        
        // 生成唯一文件名
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // 保存文件
        Path filePath = uploadDir.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // 返回访问URL
        return String.format("/uploads/%s/%s", subDir, uniqueFilename);
    }
    
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
    
    public boolean deleteFile(String fileUrl) {
        try {
            // 从URL中提取文件路径
            String filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            String subDir = fileUrl.contains("/images/") ? "images" : "files";
            Path filePath = Paths.get(uploadPath, subDir, filename);
            
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            return false;
        }
    }
}