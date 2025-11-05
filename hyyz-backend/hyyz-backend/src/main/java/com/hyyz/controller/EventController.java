package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.Event;
import com.hyyz.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
    
    private final EventService eventService;
    
    @GetMapping
    public Result<Page<Event>> getEvents(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status) {
        Page<Event> eventPage = eventService.getEvents(page, size, category, status);
        return Result.success(eventPage);
    }
    
    @GetMapping("/{id}")
    public Result<Event> getEventDetail(@PathVariable Long id) {
        Event event = eventService.getEventDetail(id);
        return Result.success(event);
    }
    
    @PostMapping
    public Result<Event> createEvent(@Valid @RequestBody CreateEventRequest request) {
        Event event = eventService.createEvent(request);
        return Result.success("活动创建成功", event);
    }
    
    @PutMapping("/{id}")
    public Result<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody UpdateEventRequest request) {
        Event event = eventService.updateEvent(id, request);
        return Result.success("活动更新成功", event);
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return Result.success("活动删除成功");
    }
    
    @GetMapping("/categories")
    public Result<?> getCategories() {
        return Result.success(eventService.getCategories());
    }
    
    // 请求对象
    @Data
    static class CreateEventRequest {
        @NotBlank(message = "活动标题不能为空")
        private String title;
        
        private String description;
        private String content;
        private String coverImage;
        
        @NotNull(message = "活动分类不能为空")
        private Event.EventCategory category;
        
        @NotNull(message = "开始时间不能为空")
        private LocalDateTime startTime;
        
        @NotNull(message = "结束时间不能为空")
        private LocalDateTime endTime;
        
        private String location;
        private Integer maxParticipants;
        private Double price;
    }
    
    @Data
    static class UpdateEventRequest {
        private String title;
        private String description;
        private String content;
        private String coverImage;
        private Event.EventCategory category;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String location;
        private Integer maxParticipants;
        private Double price;
        private Event.EventStatus status;
    }
}