package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class FileUploadController {
    
    private final FileUploadUtil fileUploadUtil;
    
    @PostMapping
    public Result<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileUploadUtil.uploadFile(file);
            Map<String, String> result = new HashMap<>();
            result.put("url", fileUrl);
            result.put("name", file.getOriginalFilename());
            result.put("size", String.valueOf(file.getSize()));
            return Result.success("文件上传成功", result);
        } catch (Exception e) {
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }
    
    @PostMapping("/image")
    public Result<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            String imageUrl = fileUploadUtil.uploadImage(image);
            Map<String, String> result = new HashMap<>();
            result.put("url", imageUrl);
            result.put("name", image.getOriginalFilename());
            result.put("size", String.valueOf(image.getSize()));
            return Result.success("图片上传成功", result);
        } catch (Exception e) {
            return Result.error("图片上传失败: " + e.getMessage());
        }
    }
    
    @PostMapping("/multiple")
    public Result<Map<String, Object>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("success", fileUploadUtil.uploadMultipleFiles(files));
            result.put("total", files.length);
            return Result.success("文件批量上传成功", result);
        } catch (Exception e) {
            return Result.error("文件批量上传失败: " + e.getMessage());
        }
    }
}