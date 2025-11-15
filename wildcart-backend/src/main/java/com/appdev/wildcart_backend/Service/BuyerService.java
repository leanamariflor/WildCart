package com.appdev.wildcart_backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.wildcart_backend.Entity.BuyerEntity;
import com.appdev.wildcart_backend.Repository.BuyerRepository;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public BuyerEntity registerBuyer(BuyerEntity buyer) {
        // You can add validation here (email exists, password strength, etc.)
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
