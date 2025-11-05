package com.hyyz.service;

import com.hyyz.controller.ContentManagementController;
import com.hyyz.entity.Content;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface ContentService {
    
    Page<Content> getContents(int page, int size, String category, String status, String keyword);
    
    Content getContentDetail(Long id);
    
    Content createContent(ContentManagementController.CreateContentRequest request);
    
    Content updateContent(Long id, ContentManagementController.UpdateContentRequest request);
    
    void deleteContent(Long id);
    
    void reviewContent(Long id, ContentManagementController.ReviewContentRequest request);
    
    Map<String, Object> getContentStats();
    
    Page<Content> getHotContents();
    
    void incrementViews(Long id);
}