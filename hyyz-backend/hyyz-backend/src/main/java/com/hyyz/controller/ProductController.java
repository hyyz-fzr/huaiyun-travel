package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.Product;
import com.hyyz.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping
    public Result<Page<Product>> getProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort) {
        Page<Product> productPage = productService.getProducts(page, size, category, keyword, sort);
        return Result.success(productPage);
    }
    
    @GetMapping("/{id}")
    public Result<Product> getProductDetail(@PathVariable Long id) {
        Product product = productService.getProductDetail(id);
        return Result.success(product);
    }
    
    @PostMapping
    public Result<Product> createProduct(@Valid @RequestBody CreateProductRequest request) {
        Product product = productService.createProduct(request);
        return Result.success("产品创建成功", product);
    }
    
    @PutMapping("/{id}")
    public Result<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody UpdateProductRequest request) {
        Product product = productService.updateProduct(id, request);
        return Result.success("产品更新成功", product);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return Result.success("产品删除成功");
    }
    
    @GetMapping("/categories")
    public Result<?> getCategories() {
        return Result.success(productService.getCategories());
    }
    
    @GetMapping("/search")
    public Result<Page<Product>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<Product> productPage = productService.searchProducts(keyword, page, size);
        return Result.success(productPage);
    }
    
    // 请求对象
    @Data
    static class CreateProductRequest {
        @NotBlank(message = "产品名称不能为空")
        private String name;
        
        @NotNull(message = "分类不能为空")
        private Product.ProductCategory category;
        
        private String description;
        private String content;
        private Double price;
        private Double originalPrice;
        private Integer stock;
        private List<String> tags;
    }
    
    @Data
    static class UpdateProductRequest {
        private String name;
        private Product.ProductCategory category;
        private String description;
        private String content;
        private Double price;
        private Double originalPrice;
        private Integer stock;
        private List<String> tags;
        private ContentStatus status;
    }
}