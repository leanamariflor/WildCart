package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevg4.syntheque.entity.OrderItemEntity;
import com.appdevg4.syntheque.repository.OrderItemRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    // CREATE
    public OrderItemEntity insertOrderItem(OrderItemEntity item) {
        return orderItemRepository.save(item);
    }

    // READ ALL
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    // READ BY ORDER ID
    public List<OrderItemEntity> getOrderItemsByOrderId(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    // UPDATE
    public OrderItemEntity updateOrderItem(int id, OrderItemEntity newItem) {
        return orderItemRepository.findById(id).map(item -> {
            item.setOrderId(newItem.getOrderId());
            item.setProductName(newItem.getProductName());
            item.setQuantity(newItem.getQuantity());
            item.setPrice(newItem.getPrice());
            return orderItemRepository.save(item);
        }).orElseThrow(() -> new NoSuchElementException("OrderItem ID " + id + " does not exist!"));
    }

    // DELETE
    public String deleteOrderItem(int id) {
        if (orderItemRepository.findById(id).isPresent()) {
            orderItemRepository.deleteById(id);
            return "OrderItem " + id + " is successfully deleted!";
        } else {
            return "OrderItem " + id + " does not exist.";
        }
    }
}
