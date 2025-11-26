package com.appdevg4.syntheque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevg4.syntheque.entity.OrderItemEntity;
import com.appdevg4.syntheque.service.OrderItemService;

import java.util.List;

@RestController
@RequestMapping("/orderitem")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    // CREATE
    @PostMapping("/insertOrderItem")
    public OrderItemEntity addOrderItem(@RequestBody OrderItemEntity item) {
        return orderItemService.insertOrderItem(item);
    }

    // READ ALL
    @GetMapping("/getAllOrderItems")
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    // READ BY ORDER ID
    @GetMapping("/getByOrderId")
    public List<OrderItemEntity> getByOrderId(@RequestParam int orderId) {
        return orderItemService.getOrderItemsByOrderId(orderId);
    }

    // UPDATE
    @PutMapping("/update/updateOrderItem")
    public OrderItemEntity updateOrderItem(@RequestParam int id, @RequestBody OrderItemEntity item) {
        return orderItemService.updateOrderItem(id, item);
    }

    // DELETE
    @DeleteMapping("/delete/deleteOrderItem/{id}")
    public String deleteOrderItem(@PathVariable int id) {
        return orderItemService.deleteOrderItem(id);
    }
}
