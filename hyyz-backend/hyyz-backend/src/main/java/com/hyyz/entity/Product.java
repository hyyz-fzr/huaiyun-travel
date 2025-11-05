package com.hyyz.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private ProductCategory category;
    
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @ElementCollection
    private List<String> images;
    
    private Double price;
    private Double originalPrice;
    private Integer stock = 0;
    private Integer sales = 0;
    
    @ElementCollection
    private List<String> tags;
    
    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;
    
    @Column(updatable = false)
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
    
    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        updateTime = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
    }
    
    public enum ProductCategory {
        FOOD, CRAFT, STATIONERY, CLOTHING, HOME
    }
}