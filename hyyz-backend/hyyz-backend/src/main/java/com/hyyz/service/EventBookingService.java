package com.hyyz.service;

import com.hyyz.controller.EventBookingController;
import com.hyyz.entity.EventBooking;
import org.springframework.data.domain.Page;

public interface EventBookingService {
    
    EventBooking bookEvent(Long eventId, EventBookingController.BookEventRequest request);
    
    void cancelBooking(Long eventId);
    
    Page<EventBooking> getMyBookings(int page, int size);
    
    Page<EventBooking> getEventBookings(Long eventId, int page, int size);
    
    EventBooking updateBookingStatus(Long bookingId, EventBooking.BookingStatus status);
}