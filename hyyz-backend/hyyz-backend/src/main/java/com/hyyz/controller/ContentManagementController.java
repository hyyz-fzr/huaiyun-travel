package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.Content;
import com.hyyz.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/contents")
@RequiredArgsConstructor
public class ContentManagementController {
    
    private final ContentService contentService;
    
    @GetMapping
    public Result<Page<Content>> getContents(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword) {
        Page<Content> contentPage = contentService.getContents(page, size, category, status, keyword);
        return Result.success(contentPage);
    }
    
    @GetMapping("/{id}")
    public Result<Content> getContentDetail(@PathVariable Long id) {
        Content content = contentService.getContentDetail(id);
        return Result.success(content);
    }
    
    @PostMapping
    public Result<Content> createContent(@Valid @RequestBody CreateContentRequest request) {
        Content content = contentService.createContent(request);
        return Result.success("内容创建成功", content);
    }
    
    @PutMapping("/{id}")
    public Result<Content> updateContent(@PathVariable Long id, @Valid @RequestBody UpdateContentRequest request) {
        Content content = contentService.updateContent(id, request);
        return Result.success("内容更新成功", content);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteContent(@PathVariable Long id) {
        contentService.deleteContent(id);
        return Result.success("内容删除成功");
    }
    
    @PutMapping("/{id}/review")
    public Result<Void> reviewContent(@PathVariable Long id, @Valid @RequestBody ReviewContentRequest request) {
        contentService.reviewContent(id, request);
        return Result.success("内容审核完成");
    }
    
    @GetMapping("/stats")
    public Result<?> getContentStats() {
        return Result.success(contentService.getContentStats());
    }
    
    @GetMapping("/hot")
    public Result<?> getHotContents() {
        return Result.success(contentService.getHotContents());
    }
    
    // 请求对象
    @Data
    static class CreateContentRequest {
        @NotBlank(message = "标题不能为空")
        private String title;
        
        @NotBlank(message = "分类不能为空")
        private String category;
        
        private String description;
        private String content;
        private String coverImage;
        private List<String> tags;
    }
    
    @Data
    static class UpdateContentRequest {
        private String title;
        private String category;
        private String description;
        private String content;
        private String coverImage;
        private List<String> tags;
        private ContentStatus status;
    }
    
    @Data
    static class ReviewContentRequest {
        @NotNull(message = "审核状态不能为空")
        private ContentStatus status;
        
        private String reviewComment;
    }
}