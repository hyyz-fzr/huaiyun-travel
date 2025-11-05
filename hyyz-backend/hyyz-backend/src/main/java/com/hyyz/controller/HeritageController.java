package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.Heritage;
import com.hyyz.service.HeritageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/heritage")
@RequiredArgsConstructor
public class HeritageController {
    
    private final HeritageService heritageService;
    
    @GetMapping
    public Result<Page<Heritage>> getHeritageList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword) {
        Page<Heritage> heritagePage = heritageService.getHeritageList(page, size, category, keyword);
        return Result.success(heritagePage);
    }
    
    @GetMapping("/{id}")
    public Result<Heritage> getHeritageDetail(@PathVariable Long id) {
        Heritage heritage = heritageService.getHeritageDetail(id);
        return Result.success(heritage);
    }
    
    @PostMapping
    public Result<Heritage> createHeritage(@Valid @RequestBody CreateHeritageRequest request) {
        Heritage heritage = heritageService.createHeritage(request);
        return Result.success("文化遗产创建成功", heritage);
    }
    
    @PutMapping("/{id}")
    public Result<Heritage> updateHeritage(@PathVariable Long id, @Valid @RequestBody UpdateHeritageRequest request) {
        Heritage heritage = heritageService.updateHeritage(id, request);
        return Result.success("文化遗产更新成功", heritage);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteHeritage(@PathVariable Long id) {
        heritageService.deleteHeritage(id);
        return Result.success("文化遗产删除成功");
    }
    
    @GetMapping("/categories")
    public Result<?> getCategories() {
        return Result.success(heritageService.getCategories());
    }
    
    @GetMapping("/search")
    public Result<Page<Heritage>> searchHeritage(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<Heritage> heritagePage = heritageService.searchHeritage(keyword, page, size);
        return Result.success(heritagePage);
    }
    
    @GetMapping("/recommended")
    public Result<?> getRecommended() {
        return Result.success(heritageService.getRecommendedHeritage());
    }
    
    // 请求对象
    @Data
    static class CreateHeritageRequest {
        @NotBlank(message = "名称不能为空")
        private String name;
        
        @NotNull(message = "分类不能为空")
        private Heritage.HeritageCategory category;
        
        private String description;
        private String content;
        private String location;
        private Heritage.HeritageLevel level;
        private List<String> tags;
    }
    
    @Data
    static class UpdateHeritageRequest {
        private String name;
        private Heritage.HeritageCategory category;
        private String description;
        private String content;
        private String location;
        private Heritage.HeritageLevel level;
        private List<String> tags;
        private ContentStatus status;
    }
}