package com.hyyz.service.impl;

import com.hyyz.controller.PostController;
import com.hyyz.entity.Post;
import com.hyyz.entity.User;
import com.hyyz.repository.PostRepository;
import com.hyyz.service.PostService;
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
public class PostServiceImpl implements PostService {
    
    private final PostRepository postRepository;
    
    @Override
    public Page<Post> getPosts(int page, int size, String tag, String keyword, String sort) {
        Pageable pageable = createPageable(page, size, sort);
        
        Specification<Post> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), Post.ContentStatus.PUBLISHED));
            
            if (tag != null && !tag.trim().isEmpty()) {
                predicates.add(cb.isMember(tag, root.get("tags")));
            }
            
            if (keyword != null && !keyword.trim().isEmpty()) {
                String likeKeyword = "%" + keyword + "%";
                predicates.add(cb.or(
                    cb.like(root.get("title"), likeKeyword),
                    cb.like(root.get("content"), likeKeyword),
                    cb.like(root.get("summary"), likeKeyword)
                ));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        
        return postRepository.findAll(spec, pageable);
    }
    
    @Override
    public Post getPostDetail(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        
        // 增加浏览量
        post.setViews(post.getViews() + 1);
        postRepository.save(post);
        
        return post;
    }
    
    @Override
    public Post createPost(PostController.CreatePostRequest request) {
        User currentUser = getCurrentUser();
        
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setSummary(request.getSummary());
        post.setTags(request.getTags());
        post.setImages(request.getImages());
        post.setAuthor(currentUser);
        post.setStatus(Post.ContentStatus.PUBLISHED);
        
        return postRepository.save(post);
    }
    
    @Override
    public Post updatePost(Long id, PostController.UpdatePostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        
        checkEditPermission(post);
        
        if (request.getTitle() != null) {
            post.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            post.setContent(request.getContent());
        }
        if (request.getSummary() != null) {
            post.setSummary(request.getSummary());
        }
        if (request.getTags() != null) {
            post.setTags(request.getTags());
        }
        if (request.getImages() != null) {
            post.setImages(request.getImages());
        }
        if (request.getStatus() != null) {
            post.setStatus(request.getStatus());
        }
        
        return postRepository.save(post);
    }
    
    @Override
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        
        checkEditPermission(post);
        
        postRepository.delete(post);
    }
    
    @Override
    public void likePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
    }
    
    @Override
    public void unlikePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        if (post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1);
            postRepository.save(post);
        }
    }
    
    @Override
    public void collectPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        post.setCollections(post.getCollections() + 1);
        postRepository.save(post);
    }
    
    @Override
    public void uncollectPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        if (post.getCollections() > 0) {
            post.setCollections(post.getCollections() - 1);
            postRepository.save(post);
        }
    }
    
    @Override
    public List<Map<String, Object>> getPostComments(Long postId) {
        // 实现获取帖子评论逻辑
        return new ArrayList<>();
    }
    
    @Override
    public Map<String, Object> addComment(Long postId, PostController.AddCommentRequest request) {
        // 实现添加评论逻辑
        Map<String, Object> result = new HashMap<>();
        result.put("id", 1L);
        result.put("content", request.getContent());
        result.put("createTime", LocalDateTime.now());
        return result;
    }
    
    @Override
    public void deleteComment(Long postId, Long commentId) {
        // 实现删除评论逻辑
    }
    
    @Override
    public List<Post> getHotPosts() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "views"));
        return postRepository.findByStatus(Post.ContentStatus.PUBLISHED, pageable).getContent();
    }
    
    @Override
    public Page<Post> getUserPosts(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createTime"));
        return postRepository.findByAuthorIdAndStatus(userId, Post.ContentStatus.PUBLISHED, pageable);
    }
    
    @Override
    public void incrementViews(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("帖子不存在"));
        post.setViews(post.getViews() + 1);
        postRepository.save(post);
    }
    
    private Pageable createPageable(int page, int size, String sort) {
        Sort sortObj;
        switch (sort) {
            case "hot":
                sortObj = Sort.by(Sort.Direction.DESC, "views", "likes");
                break;
            case "latest":
                sortObj = Sort.by(Sort.Direction.DESC, "createTime");
                break;
            case "popular":
                sortObj = Sort.by(Sort.Direction.DESC, "likes", "views");
                break;
            default:
                sortObj = Sort.by(Sort.Direction.DESC, "createTime");
        }
        return PageRequest.of(page - 1, size, sortObj);
    }
    
    private User getCurrentUser() {
        // 实现获取当前用户逻辑
        return new User(); // 简化实现
    }
    
    private void checkEditPermission(Post post) {
        User currentUser = getCurrentUser();
        if (!post.getAuthor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("没有编辑权限");
        }
    }
}