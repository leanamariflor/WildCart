package com.appdevg4.syntheque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import com.appdevg4.syntheque.entity.SellerEntity;
import com.appdevg4.syntheque.service.SellerService;
import com.appdevg4.syntheque.dto.LoginRequest;

@RestController
@RequestMapping("/api/sellers")
@Validated
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SellerEntity seller) {
        try {
            SellerEntity savedSeller = sellerService.registerSeller(seller);
            return ResponseEntity.ok(savedSeller);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            SellerEntity seller = sellerService.loginSeller(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(seller);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeller(@PathVariable Long id, @Valid @RequestBody SellerEntity seller) {
        try {
            SellerEntity updated = sellerService.updateSeller(id, seller);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller(@PathVariable Long id) {
        try {
            sellerService.deleteSeller(id);
            return ResponseEntity.ok("Seller deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerEntity> getSellerById(@PathVariable Long id) {
        SellerEntity seller = sellerService.getSellerById(id);
        if (seller != null) return ResponseEntity.ok(seller);
        return ResponseEntity.notFound().build();
    }
}
