package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.appdevg4.syntheque.entity.BuyerEntity;
import com.appdevg4.syntheque.repository.BuyerRepository;
import com.appdevg4.syntheque.util.SecurityUtil;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public BuyerEntity registerBuyer(BuyerEntity buyer) throws Exception {
        // Validate email format
        if (buyer.getEmail() == null || buyer.getEmail().trim().isEmpty()) {
            throw new Exception("Email is required");
        }
        String email = buyer.getEmail().trim().toLowerCase();
        
        if (!SecurityUtil.isValidEmail(email)) {
            throw new Exception("Invalid email format");
        }
        
        BuyerEntity existingBuyer = buyerRepository.findByEmail(email);
        if (existingBuyer != null) {
            throw new Exception("Email already registered");
        }
        
        // Validate password strength
        if (!SecurityUtil.isValidPassword(buyer.getPassword())) {
            throw new Exception("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character");
        }
        
        // Sanitize all text inputs (but not email - it's already validated)
        buyer.setEmail(email);
        if (buyer.getFirstName() != null) {
            buyer.setFirstName(SecurityUtil.validateAndSanitize(buyer.getFirstName()));
        }
        if (buyer.getLastName() != null) {
            buyer.setLastName(SecurityUtil.validateAndSanitize(buyer.getLastName()));
        }
        if (buyer.getStudentId() != null) {
            buyer.setStudentId(SecurityUtil.validateAndSanitize(buyer.getStudentId()));
        }
        if (buyer.getNumber() != null) {
            buyer.setNumber(SecurityUtil.validateAndSanitize(buyer.getNumber()));
        }
        
        // Hash password
        String hashedPassword = passwordEncoder.encode(buyer.getPassword());
        buyer.setPassword(hashedPassword);
        return buyerRepository.save(buyer);
    }

    public BuyerEntity loginBuyer(String email, String password) throws Exception {
        // Trim and lowercase email
        if (email == null || email.trim().isEmpty()) {
            throw new Exception("Email is required");
        }
        email = email.trim().toLowerCase();
        
        // Validate email format without over-sanitizing
        if (!SecurityUtil.isValidEmail(email)) {
            throw new Exception("Invalid email format");
        }
        
        BuyerEntity buyer = buyerRepository.findByEmail(email);
        // Use passwordEncoder.matches() to compare raw password with hashed password
        if (buyer == null || !passwordEncoder.matches(password, buyer.getPassword())) {
            throw new Exception("Invalid email or password");
        }
        return buyer;
    }

    public BuyerEntity getBuyerById(Long id) {
        return buyerRepository.findById(id).orElse(null);
    }

    public BuyerEntity updateBuyer(Long id, BuyerEntity updatedBuyer) throws Exception {
        return buyerRepository.findById(id).map(buyer -> {
            // Sanitize all inputs
            if (updatedBuyer.getFirstName() != null) {
                buyer.setFirstName(SecurityUtil.validateAndSanitize(updatedBuyer.getFirstName()));
            }
            if (updatedBuyer.getLastName() != null) {
                buyer.setLastName(SecurityUtil.validateAndSanitize(updatedBuyer.getLastName()));
            }
            if (updatedBuyer.getStudentId() != null) {
                buyer.setStudentId(SecurityUtil.validateAndSanitize(updatedBuyer.getStudentId()));
            }
            if (updatedBuyer.getNumber() != null) {
                buyer.setNumber(SecurityUtil.validateAndSanitize(updatedBuyer.getNumber()));
            }
            return buyerRepository.save(buyer);
        }).orElse(null);
    }
}
