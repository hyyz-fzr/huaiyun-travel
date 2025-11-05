package com.hyyz.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private String coverImage;
    
    @Enumerated(EnumType.STRING)
    private EventCategory category;
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private Integer maxParticipants;
    private Integer currentParticipants = 0;
    private Double price = 0.0;
    
    @Enumerated(EnumType.STRING)
    private EventStatus status = EventStatus.UPCOMING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id")
    private User organizer;
    
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
    
    public enum EventCategory {
        CULTURE_LECTURE, WORKSHOP, EXHIBITION, PERFORMANCE, TOUR
    }
    
    public enum EventStatus {
        UPCOMING, ONGOING, COMPLETED, CANCELLED
    }
}