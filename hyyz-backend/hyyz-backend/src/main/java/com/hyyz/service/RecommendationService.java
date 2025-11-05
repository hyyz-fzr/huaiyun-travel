package com.hyyz.service;

import com.hyyz.entity.Heritage;
import com.hyyz.entity.Product;
import com.hyyz.entity.Post;

import java.util.List;

public interface RecommendationService {
    
    List<Heritage> recommendHeritageForUser(Long userId);
    
    List<Product> recommendProductsForUser(Long userId);
    
    List<Post> recommendPostsForUser(Long userId);
    
    List<Heritage> getSimilarHeritage(Long heritageId);
    
    List<Product> getSimilarProducts(Long productId);
    
    List<Post> getSimilarPosts(Long postId);
    
    List<Object> getTrendingContent();
}