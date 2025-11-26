package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevg4.syntheque.entity.OrderEntity;
import com.appdevg4.syntheque.repository.OrderRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // CREATE
    public OrderEntity insertOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    // READ 
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    // UPDATE
    public OrderEntity updateOrder(int id, OrderEntity newOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setOrderName(newOrder.getOrderName());
            order.setAmount(newOrder.getAmount());
            order.setStatus(newOrder.getStatus());
            return orderRepository.save(order);
        }).orElseThrow(() -> new NoSuchElementException("Order ID " + id + " does not exist!"));
    }

    // DELETE
    public String deleteOrder(int id) {
        String msg = "";
        if (orderRepository.findById(id).isPresent()) {
            orderRepository.deleteById(id);
            msg = "Order " + id + " is successfully deleted!";
        } else {
            msg = "Order " + id + " does not exist.";
        }
        return msg;
    }
}
