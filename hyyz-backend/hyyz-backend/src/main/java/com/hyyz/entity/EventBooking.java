package com.hyyz.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "event_bookings")
public class EventBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private Integer participants = 1;
    private String contactName;
    private String contactPhone;
    private String contactEmail;
    private String notes;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CONFIRMED;
    
    private Double totalAmount;
    private LocalDateTime bookingTime;
    
    @Column(updatable = false)
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
    
    @PrePersist
    protected void onCreate() {
        createTime = LocalDateTime.now();
        updateTime = LocalDateTime.now();
        if (bookingTime == null) {
            bookingTime = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updateTime = LocalDateTime.now();
    }
    
    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED, ATTENDED
    }
}