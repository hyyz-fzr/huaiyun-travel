package com.hyyz.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private String summary;
    
    @ElementCollection
    private List<String> images;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    
    @ElementCollection
    private List<String> tags;
    
    private Integer views = 0;
    private Integer likes = 0;
    private Integer comments = 0;
    private Integer collections = 0;
    
    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.PUBLISHED;
    
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
}