package com.appdevg4.syntheque.controller;

import com.appdevg4.syntheque.entity.PaymentEntity;
import com.appdevg4.syntheque.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public PaymentEntity createPayment(@RequestBody PaymentEntity payment) {
        return paymentService.savePayment(payment);
    }
}
