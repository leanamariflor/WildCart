package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.appdevg4.syntheque.entity.SellerEntity;
import com.appdevg4.syntheque.repository.SellerRepository;
import com.appdevg4.syntheque.util.SecurityUtil;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public SellerEntity registerSeller(SellerEntity seller) throws Exception {
        // Validate email format
        if (seller.getEmail() == null || seller.getEmail().trim().isEmpty()) {
            throw new Exception("Email is required");
        }
        String email = seller.getEmail().trim().toLowerCase();
        
        if (!SecurityUtil.isValidEmail(email)) {
            throw new Exception("Invalid email format");
        }
        
        SellerEntity existingSeller = sellerRepository.findByEmail(email);
        if (existingSeller != null) {
            throw new Exception("Email already registered: " + email);
        }
        
        // Validate password strength
        if (!SecurityUtil.isValidPassword(seller.getPassword())) {
            throw new Exception("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character");
        }
        
        // Sanitize all text inputs (but not email - it's already validated)
        seller.setEmail(email);
        if (seller.getFirstName() != null) {
            seller.setFirstName(SecurityUtil.validateAndSanitize(seller.getFirstName()));
        }
        if (seller.getLastName() != null) {
            seller.setLastName(SecurityUtil.validateAndSanitize(seller.getLastName()));
        }
        if (seller.getSellerId() != null) {
            seller.setSellerId(SecurityUtil.validateAndSanitize(seller.getSellerId()));
        }
        if (seller.getNumber() != null) {
            seller.setNumber(SecurityUtil.validateAndSanitize(seller.getNumber()));
        }
        
        // Hash password
        String hashedPassword = passwordEncoder.encode(seller.getPassword());
        seller.setPassword(hashedPassword);
        
        return sellerRepository.save(seller);
    }

    public SellerEntity loginSeller(String email, String password) throws Exception {
        // Trim and lowercase email
        if (email == null || email.trim().isEmpty()) {
            throw new Exception("Email is required");
        }
        email = email.trim().toLowerCase();
        
        // Validate email format without over-sanitizing
        if (!SecurityUtil.isValidEmail(email)) {
            throw new Exception("Invalid email format");
        }
        
        SellerEntity seller = sellerRepository.findByEmail(email);
        if (seller == null || !passwordEncoder.matches(password, seller.getPassword())) {
            throw new Exception("Invalid email or password");
        }
        return seller;
    }

    public SellerEntity updateSeller(Long id, SellerEntity updatedSeller) throws Exception {
        SellerEntity existingSeller = sellerRepository.findById(id)
                .orElseThrow(() -> new Exception("Seller not found"));
        
        // Sanitize all inputs
        if (updatedSeller.getFirstName() != null) {
            existingSeller.setFirstName(SecurityUtil.validateAndSanitize(updatedSeller.getFirstName()));
        }
        if (updatedSeller.getLastName() != null) {
            existingSeller.setLastName(SecurityUtil.validateAndSanitize(updatedSeller.getLastName()));
        }
        if (updatedSeller.getSellerId() != null) {
            existingSeller.setSellerId(SecurityUtil.validateAndSanitize(updatedSeller.getSellerId()));
        }
        if (updatedSeller.getEmail() != null) {
            String email = SecurityUtil.validateAndSanitize(updatedSeller.getEmail().trim());
            if (!SecurityUtil.isValidEmail(email)) {
                throw new Exception("Invalid email format");
            }
            existingSeller.setEmail(email);
        }
        if (updatedSeller.getNumber() != null) {
            existingSeller.setNumber(SecurityUtil.validateAndSanitize(updatedSeller.getNumber()));
        }
      
        if (updatedSeller.getPassword() != null && !updatedSeller.getPassword().isEmpty()) {
            if (!SecurityUtil.isValidPassword(updatedSeller.getPassword())) {
                throw new Exception("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character");
            }
            String hashedPassword = passwordEncoder.encode(updatedSeller.getPassword());
            existingSeller.setPassword(hashedPassword);
        }
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
