package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.Post;
import com.hyyz.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    
    private final PostService postService;
    
    @GetMapping
    public Result<Page<Post>> getPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort) {
        Page<Post> postPage = postService.getPosts(page, size, tag, keyword, sort);
        return Result.success(postPage);
    }
    
    @GetMapping("/{id}")
    public Result<Post> getPostDetail(@PathVariable Long id) {
        Post post = postService.getPostDetail(id);
        return Result.success(post);
    }
    
    @PostMapping
    public Result<Post> createPost(@Valid @RequestBody CreatePostRequest request) {
        Post post = postService.createPost(request);
        return Result.success("帖子发布成功", post);
    }
    
    @PutMapping("/{id}")
    public Result<Post> updatePost(@PathVariable Long id, @Valid @RequestBody UpdatePostRequest request) {
        Post post = postService.updatePost(id, request);
        return Result.success("帖子更新成功", post);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return Result.success("帖子删除成功");
    }
    
    @PostMapping("/{id}/like")
    public Result<Void> likePost(@PathVariable Long id) {
        postService.likePost(id);
        return Result.success("点赞成功");
    }
    
    @DeleteMapping("/{id}/like")
    public Result<Void> unlikePost(@PathVariable Long id) {
        postService.unlikePost(id);
        return Result.success("取消点赞成功");
    }
    
    @PostMapping("/{id}/collect")
    public Result<Void> collectPost(@PathVariable Long id) {
        postService.collectPost(id);
        return Result.success("收藏成功");
    }
    
    @DeleteMapping("/{id}/collect")
    public Result<Void> uncollectPost(@PathVariable Long id) {
        postService.uncollectPost(id);
        return Result.success("取消收藏成功");
    }
    
    @GetMapping("/{id}/comments")
    public Result<?> getPostComments(@PathVariable Long id) {
        return Result.success(postService.getPostComments(id));
    }
    
    @PostMapping("/{id}/comments")
    public Result<?> addComment(@PathVariable Long id, @Valid @RequestBody AddCommentRequest request) {
        return Result.success("评论成功", postService.addComment(id, request));
    }
    
    @DeleteMapping("/{postId}/comments/{commentId}")
    public Result<Void> deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        postService.deleteComment(postId, commentId);
        return Result.success("评论删除成功");
    }
    
    @GetMapping("/hot")
    public Result<?> getHotPosts() {
        return Result.success(postService.getHotPosts());
    }
    
    // 请求对象
    @Data
    static class CreatePostRequest {
        @NotBlank(message = "标题不能为空")
        private String title;
        
        @NotBlank(message = "内容不能为空")
        private String content;
        
        private String summary;
        private List<String> tags;
        private List<String> images;
    }
    
    @Data
    static class UpdatePostRequest {
        private String title;
        private String content;
        private String summary;
        private List<String> tags;
        private List<String> images;
        private ContentStatus status;
    }
    
    @Data
    static class AddCommentRequest {
        @NotBlank(message = "评论内容不能为空")
        private String content;
        
        private Long parentId;
        private Long replyTo;
    }
}