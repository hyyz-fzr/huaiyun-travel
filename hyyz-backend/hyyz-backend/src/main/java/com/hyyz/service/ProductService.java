package com.hyyz.service;

import com.hyyz.controller.ProductController;
import com.hyyz.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ProductService {
    
    Page<Product> getProducts(int page, int size, String category, String keyword, String sort);
    
    Product getProductDetail(Long id);
    
    Product createProduct(ProductController.CreateProductRequest request);
    
    Product updateProduct(Long id, ProductController.UpdateProductRequest request);
    
    void deleteProduct(Long id);
    
    List<Map<String, Object>> getCategories();
    
    Page<Product> searchProducts(String keyword, int page, int size);
    
    void updateStock(Long productId, Integer quantity);
    
    List<Product> getRelatedProducts(Long productId);
}