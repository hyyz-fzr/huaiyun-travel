package com.hyyz.controller;

import com.hyyz.common.Result;
import com.hyyz.entity.ProductOrder;
import com.hyyz.service.ProductOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class ProductOrderController {
    
    private final ProductOrderService orderService;
    
    @PostMapping
    public Result<ProductOrder> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        ProductOrder order = orderService.createOrder(request);
        return Result.success("订单创建成功", order);
    }
    
    @GetMapping
    public Result<Page<ProductOrder>> getOrders(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        Page<ProductOrder> orders = orderService.getOrders(page, size, status);
        return Result.success(orders);
    }
    
    @GetMapping("/{id}")
    public Result<ProductOrder> getOrderDetail(@PathVariable Long id) {
        ProductOrder order = orderService.getOrderDetail(id);
        return Result.success(order);
    }
    
    @PutMapping("/{id}/cancel")
    public Result<Void> cancelOrder(@PathVariable Long id) {
        orderService.cancelOrder(id);
        return Result.success("订单取消成功");
    }
    
    @PutMapping("/{id}/pay")
    public Result<Void> payOrder(@PathVariable Long id) {
        orderService.payOrder(id);
        return Result.success("支付成功");
    }
    
    // 请求对象
    @Data
    static class CreateOrderRequest {
        @NotEmpty(message = "订单商品不能为空")
        private List<OrderItemRequest> items;
        
        @NotBlank(message = "收货地址不能为空")
        private String shippingAddress;
        
        @NotBlank(message = "联系人姓名不能为空")
        private String contactName;
        
        @NotBlank(message = "联系人电话不能为空")
        private String contactPhone;
        
        private String notes;
    }
    
    @Data
    static class OrderItemRequest {
        @NotNull(message = "商品ID不能为空")
        private Long productId;
        
        @NotNull(message = "商品数量不能为空")
        @Min(value = 1, message = "商品数量至少为1")
        private Integer quantity;
    }
}