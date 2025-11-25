package com.appdevg4.syntheque.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevg4.syntheque.entity.OrderEntity;
import com.appdevg4.syntheque.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // CREATE
    @PostMapping("/insertOrder")
    public OrderEntity addOrder(@RequestBody OrderEntity order) {
        return orderService.insertOrder(order);
    }

    // READ ALL
    @GetMapping("/getAllOrders")
    public List<OrderEntity> getAllOrders() {
        return orderService.getAllOrders();
    }

    // UPDATE
    @PutMapping("/update/updateOrder")
    public OrderEntity updateOrder(@RequestParam int id, @RequestBody OrderEntity order) {
        return orderService.updateOrder(id, order);
    }

    // DELETE
    @DeleteMapping("/delete/deleteOrder/{id}")
    public String deleteOrder(@PathVariable int id) {
        return orderService.deleteOrder(id);
    }
}
