package com.appdev.wildcart_backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.appdev.wildcart_backend.Entity.SellerEntity;
import com.appdev.wildcart_backend.Service.SellerService;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SellerEntity seller) {
        try {
            SellerEntity savedSeller = sellerService.registerSeller(seller);
            return ResponseEntity.ok(savedSeller);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SellerEntity loginData) {
        try {
            SellerEntity seller = sellerService.loginSeller(loginData.getEmail(), loginData.getPassword());
            return ResponseEntity.ok(seller);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // Optional: CRUD endpoints
    @GetMapping
    public ResponseEntity<?> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeller(@PathVariable Long id, @RequestBody SellerEntity seller) {
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
}
