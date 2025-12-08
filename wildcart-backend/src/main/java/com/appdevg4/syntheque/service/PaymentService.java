package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.PaymentEntity;
import com.appdevg4.syntheque.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public PaymentEntity savePayment(PaymentEntity payment) {
        return paymentRepository.save(payment);
    }
}
