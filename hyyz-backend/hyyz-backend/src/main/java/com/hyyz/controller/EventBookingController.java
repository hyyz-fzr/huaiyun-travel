package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.EventBooking;
import com.hyyz.service.EventBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventBookingController {
    
    private final EventBookingService eventBookingService;
    
    @PostMapping("/{eventId}/book")
    public Result<EventBooking> bookEvent(@PathVariable Long eventId, @Valid @RequestBody BookEventRequest request) {
        EventBooking booking = eventBookingService.bookEvent(eventId, request);
        return Result.success("活动预订成功", booking);
    }
    
    @DeleteMapping("/{eventId}/book")
    public Result<Void> cancelBooking(@PathVariable Long eventId) {
        eventBookingService.cancelBooking(eventId);
        return Result.success("预订取消成功");
    }
    
    @GetMapping("/my-bookings")
    public Result<Page<EventBooking>> getMyBookings(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<EventBooking> bookings = eventBookingService.getMyBookings(page, size);
        return Result.success(bookings);
    }
    
    // 请求对象
    @Data
    static class BookEventRequest {
        @NotNull(message = "参与人数不能为空")
        @Min(value = 1, message = "参与人数至少为1")
        private Integer participants;
        
        @NotBlank(message = "联系人姓名不能为空")
        private String contactName;
        
        @NotBlank(message = "联系人电话不能为空")
        private String contactPhone;
        
        private String contactEmail;
        private String notes;
    }
}