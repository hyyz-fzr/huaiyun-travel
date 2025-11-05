package com.hyyz.service;

import com.hyyz.controller.EventController;
import com.hyyz.entity.Event;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface EventService {
    
    Page<Event> getEvents(int page, int size, String category, String status);
    
    Event getEventDetail(Long id);
    
    Event createEvent(EventController.CreateEventRequest request);
    
    Event updateEvent(Long id, EventController.UpdateEventRequest request);
    
    void deleteEvent(Long id);
    
    List<Map<String, Object>> getCategories();
    
    List<Event> getUpcomingEvents();
    
    void updateEventStatus();
}