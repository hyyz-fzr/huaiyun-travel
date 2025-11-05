package com.hyyz.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "heritage")
public class Heritage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private HeritageCategory category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    
    @ElementCollection
    private List<String> images;
    
    private String location;
    
    @Enumerated(EnumType.STRING)
    private HeritageLevel level;
    
    private Integer views = 0;
    private Integer likes = 0;
    
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
    private LocalDateTime publishTime;
    
    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        updateTime = LocalDateTime.now();
        if (status == ContentStatus.PUBLISHED) {
            publishTime = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
        if (status == ContentStatus.PUBLISHED && publishTime == null) {
            publishTime = LocalDateTime.now();
        }
    }
    
    public enum HeritageCategory {
        TOFU_CULTURE, BAGONG_LEGEND, HISTORICAL_SITE, TRADITIONAL_SKILL, FOLK_CULTURE
    }
    
    public enum HeritageLevel {
        NATIONAL, PROVINCIAL, CITY
    }
}