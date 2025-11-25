package com.appdevg4.syntheque.entity;

import jakarta.persistence.*;

@Entity
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private String orderName;
    private double amount;

    public OrderEntity() {
        super();
    }

    public OrderEntity(int orderId, String orderName, double amount) {
        super();
        this.orderId = orderId;
        this.orderName = orderName;
        this.amount = amount;
    }

    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }
    public String getOrderName() { return orderName; }
    public void setOrderName(String orderName) { this.orderName = orderName; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
