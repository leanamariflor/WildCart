package com.appdevg4.syntheque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

import com.appdevg4.syntheque.entity.BuyerEntity;
import com.appdevg4.syntheque.service.BuyerService;
import com.appdevg4.syntheque.dto.LoginRequest;

@RestController
@RequestMapping("/api/buyers")
@Validated
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody BuyerEntity buyer) {
        try {
            BuyerEntity savedBuyer = buyerService.registerBuyer(buyer);
            return ResponseEntity.ok(savedBuyer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            BuyerEntity buyer = buyerService.loginBuyer(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(buyer);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
public ResponseEntity<BuyerEntity> getBuyerById(@PathVariable Long id) {
    BuyerEntity buyer = buyerService.getBuyerById(id);
    if (buyer != null) return ResponseEntity.ok(buyer);
    return ResponseEntity.notFound().build();
}

@PutMapping("/{id}")
public ResponseEntity<?> updateBuyer(@PathVariable Long id, @Valid @RequestBody BuyerEntity updatedBuyer) {
    try {
        BuyerEntity buyer = buyerService.updateBuyer(id, updatedBuyer);
        if (buyer != null) return ResponseEntity.ok(buyer);
        return ResponseEntity.notFound().build();
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

}
