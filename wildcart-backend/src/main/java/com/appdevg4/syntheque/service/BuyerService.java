package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevg4.syntheque.entity.BuyerEntity;
import com.appdevg4.syntheque.repository.BuyerRepository;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public BuyerEntity registerBuyer(BuyerEntity buyer) {
        return buyerRepository.save(buyer);
    }

    public BuyerEntity loginBuyer(String email, String password) throws Exception {
        BuyerEntity buyer = buyerRepository.findByEmail(email);
        if (buyer == null || !buyer.getPassword().equals(password)) {
            throw new Exception("Invalid email or password");
        }
        return buyer;
    }

    public BuyerEntity getBuyerById(Long id) {
        return buyerRepository.findById(id).orElse(null);
    }

    public BuyerEntity updateBuyer(Long id, BuyerEntity updatedBuyer) {
        return buyerRepository.findById(id).map(buyer -> {
            buyer.setFirstName(updatedBuyer.getFirstName());
            buyer.setLastName(updatedBuyer.getLastName());
            buyer.setStudentId(updatedBuyer.getStudentId());
            buyer.setNumber(updatedBuyer.getNumber());
            return buyerRepository.save(buyer);
        }).orElse(null);
    }
}
