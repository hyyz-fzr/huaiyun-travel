package com.hyyz.service;

import com.hyyz.controller.PostController;
import com.hyyz.entity.Post;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface PostService {
    
    Page<Post> getPosts(int page, int size, String tag, String keyword, String sort);
    
    Post getPostDetail(Long id);
    
    Post createPost(PostController.CreatePostRequest request);
    
    Post updatePost(Long id, PostController.UpdatePostRequest request);
    
    void deletePost(Long id);
    
    void likePost(Long id);
    
    void unlikePost(Long id);
    
    void collectPost(Long id);
    
    void uncollectPost(Long id);
    
    List<Map<String, Object>> getPostComments(Long postId);
    
    Map<String, Object> addComment(Long postId, PostController.AddCommentRequest request);
    
    void deleteComment(Long postId, Long commentId);
    
    List<Post> getHotPosts();
    
    Page<Post> getUserPosts(Long userId, int page, int size);
    
    void incrementViews(Long id);
}