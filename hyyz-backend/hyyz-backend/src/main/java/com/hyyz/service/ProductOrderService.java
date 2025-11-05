package com.hyyz.service;

import com.hyyz.controller.ProductOrderController;
import com.hyyz.entity.ProductOrder;
import org.springframework.data.domain.Page;

public interface ProductOrderService {
    
    ProductOrder createOrder(ProductOrderController.CreateOrderRequest request);
    
    Page<ProductOrder> getOrders(int page, int size, String status);
    
    ProductOrder getOrderDetail(Long id);
    
    void cancelOrder(Long id);
    
    void payOrder(Long id);
    
    void updateOrderStatus(Long id, ProductOrder.OrderStatus status);
    
    Page<ProductOrder> getUserOrders(Long userId, int page, int size);
}