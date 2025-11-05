package com.hyyz.service.impl;

import com.hyyz.controller.HeritageController;
import com.hyyz.entity.Heritage;
import com.hyyz.entity.User;
import com.hyyz.repository.HeritageRepository;
import com.hyyz.service.HeritageService;
import com.hyyz.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HeritageServiceImpl implements HeritageService {
    
    private final HeritageRepository heritageRepository;
    private final JwtUtils jwtUtils;
    
    @Override
    public Page<Heritage> getHeritageList(int page, int size, String category, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createTime"));
        
        Specification<Heritage> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), Heritage.ContentStatus.PUBLISHED));
            
            if (category != null && !category.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("category"), Heritage.HeritageCategory.valueOf(category)));
            }
            
            if (keyword != null && !keyword.trim().isEmpty()) {
                String likeKeyword = "%" + keyword + "%";
                predicates.add(cb.or(
                    cb.like(root.get("name"), likeKeyword),
                    cb.like(root.get("description"), likeKeyword),
                    cb.like(root.get("content"), likeKeyword)
                ));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        
        return heritageRepository.findAll(spec, pageable);
    }
    
    @Override
    public Heritage getHeritageDetail(Long id) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文化遗产不存在"));
        
        // 增加浏览量
        heritage.setViews(heritage.getViews() + 1);
        heritageRepository.save(heritage);
        
        return heritage;
    }
    
    @Override
    public Heritage createHeritage(HeritageController.CreateHeritageRequest request) {
        User currentUser = getCurrentUser();
        
        Heritage heritage = new Heritage();
        heritage.setName(request.getName());
        heritage.setCategory(request.getCategory());
        heritage.setDescription(request.getDescription());
        heritage.setContent(request.getContent());
        heritage.setLocation(request.getLocation());
        heritage.setLevel(request.getLevel());
        heritage.setTags(request.getTags());
        heritage.setAuthor(currentUser);
        heritage.setStatus(Heritage.ContentStatus.PUBLISHED);
        
        return heritageRepository.save(heritage);
    }
    
    @Override
    public Heritage updateHeritage(Long id, HeritageController.UpdateHeritageRequest request) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文化遗产不存在"));
        
        // 检查权限
        checkEditPermission(heritage);
        
        if (request.getName() != null) {
            heritage.setName(request.getName());
        }
        if (request.getCategory() != null) {
            heritage.setCategory(request.getCategory());
        }
        if (request.getDescription() != null) {
            heritage.setDescription(request.getDescription());
        }
        if (request.getContent() != null) {
            heritage.setContent(request.getContent());
        }
        if (request.getLocation() != null) {
            heritage.setLocation(request.getLocation());
        }
        if (request.getLevel() != null) {
            heritage.setLevel(request.getLevel());
        }
        if (request.getTags() != null) {
            heritage.setTags(request.getTags());
        }
        if (request.getStatus() != null) {
            heritage.setStatus(request.getStatus());
        }
        
        return heritageRepository.save(heritage);
    }
    
    @Override
    public void deleteHeritage(Long id) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文化遗产不存在"));
        
        // 检查权限
        checkEditPermission(heritage);
        
        heritageRepository.delete(heritage);
    }
    
    @Override
    public List<Map<String, Object>> getCategories() {
        List<Map<String, Object>> categories = new ArrayList<>();
        
        for (Heritage.HeritageCategory category : Heritage.HeritageCategory.values()) {
            long count = heritageRepository.countByCategoryAndStatus(
                category, Heritage.ContentStatus.PUBLISHED);
            
            Map<String, Object> categoryInfo = new HashMap<>();
            categoryInfo.put("id", category.name());
            categoryInfo.put("name", getCategoryName(category));
            categoryInfo.put("count", count);
            categoryInfo.put("description", getCategoryDescription(category));
            
            categories.add(categoryInfo);
        }
        
        return categories;
    }
    
    @Override
    public Page<Heritage> searchHeritage(String keyword, int page, int size) {
        return getHeritageList(page, size, null, keyword);
    }
    
    @Override
    public List<Heritage> getRecommendedHeritage() {
        // 简单的推荐逻辑：按浏览量排序
        Pageable pageable = PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "views"));
        return heritageRepository.findByStatus(Heritage.ContentStatus.PUBLISHED, pageable).getContent();
    }
    
    @Override
    public void incrementViews(Long id) {
        Heritage heritage = heritageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文化遗产不存在"));
        heritage.setViews(heritage.getViews() + 1);
        heritageRepository.save(heritage);
    }
    
    private User getCurrentUser() {
        // 实现获取当前用户逻辑
        return new User(); // 简化实现
    }
    
    private void checkEditPermission(Heritage heritage) {
        User currentUser = getCurrentUser();
        if (!currentUser.getRole().equals(User.Role.ADMIN) && 
            !currentUser.getRole().equals(User.Role.EDITOR) &&
            !heritage.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("没有编辑权限");
        }
    }
    
    private String getCategoryName(Heritage.HeritageCategory category) {
        switch (category) {
            case TOFU_CULTURE: return "豆腐文化";
            case BAGONG_LEGEND: return "八公山传说";
            case HISTORICAL_SITE: return "历史遗址";
            case TRADITIONAL_SKILL: return "传统技艺";
            case FOLK_CULTURE: return "民俗文化";
            default: return category.name();
        }
    }
    
    private String getCategoryDescription(Heritage.HeritageCategory category) {
        switch (category) {
            case TOFU_CULTURE: return "与豆腐相关的文化遗产";
            case BAGONG_LEGEND: return "八公山相关的历史传说";
            case HISTORICAL_SITE: return "重要的历史遗址遗迹";
            case TRADITIONAL_SKILL: return "传统手工艺技艺";
            case FOLK_CULTURE: return "地方民俗文化活动";
            default: return "";
        }
    }
}