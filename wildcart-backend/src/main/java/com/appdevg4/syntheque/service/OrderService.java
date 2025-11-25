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
    @SuppressWarnings("finally")
    public OrderEntity updateOrder(int id, OrderEntity newOrder) {
        OrderEntity order = null;

        try {
            order = orderRepository.findById(id).get();
            order.setOrderName(newOrder.getOrderName());
            order.setAmount(newOrder.getAmount());
            order = orderRepository.save(order);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Order ID " + id + " does not exist!");
        } finally {
            return orderRepository.save(order);
        }
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
