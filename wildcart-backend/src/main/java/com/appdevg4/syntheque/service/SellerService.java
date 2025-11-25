package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appdevg4.syntheque.entity.SellerEntity;
import com.appdevg4.syntheque.repository.SellerRepository;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public SellerEntity registerSeller(SellerEntity seller) throws Exception {
        String email = seller.getEmail().trim().toLowerCase();
        SellerEntity existingSeller = sellerRepository.findByEmail(email);
        if (existingSeller != null) {
            throw new Exception("Email already registered: " + email);
        }
        seller.setEmail(email);
        return sellerRepository.save(seller);
    }

    public SellerEntity loginSeller(String email, String password) throws Exception {
        SellerEntity seller = sellerRepository.findByEmail(email.trim().toLowerCase());
        if (seller == null || !seller.getPassword().equals(password)) {
            throw new Exception("Invalid email or password");
        }
        return seller;
    }

    public SellerEntity updateSeller(Long id, SellerEntity updatedSeller) throws Exception {
        SellerEntity existingSeller = sellerRepository.findById(id)
                .orElseThrow(() -> new Exception("Seller not found"));
        existingSeller.setFirstName(updatedSeller.getFirstName());
        existingSeller.setLastName(updatedSeller.getLastName());
        if (updatedSeller.getSellerId() != null) {
            existingSeller.setSellerId(updatedSeller.getSellerId());
        }
        existingSeller.setEmail(updatedSeller.getEmail().trim());
        existingSeller.setNumber(updatedSeller.getNumber());
        existingSeller.setPassword(updatedSeller.getPassword());
        return sellerRepository.save(existingSeller);
    }

    public void deleteSeller(Long id) {
        sellerRepository.deleteById(id);
    }

    public java.util.List<SellerEntity> getAllSellers() {
        return sellerRepository.findAll();
    }

    public SellerEntity getSellerById(Long id) {
        return sellerRepository.findById(id).orElse(null);
    }
}
