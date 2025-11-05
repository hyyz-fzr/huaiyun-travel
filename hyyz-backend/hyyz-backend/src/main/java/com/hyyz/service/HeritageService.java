package com.hyyz.service;

import com.hyyz.controller.HeritageController;
import com.hyyz.entity.Heritage;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface HeritageService {
    
    Page<Heritage> getHeritageList(int page, int size, String category, String keyword);
    
    Heritage getHeritageDetail(Long id);
    
    Heritage createHeritage(HeritageController.CreateHeritageRequest request);
    
    Heritage updateHeritage(Long id, HeritageController.UpdateHeritageRequest request);
    
    void deleteHeritage(Long id);
    
    List<Map<String, Object>> getCategories();
    
    Page<Heritage> searchHeritage(String keyword, int page, int size);
    
    List<Heritage> getRecommendedHeritage();
    
    void incrementViews(Long id);
}