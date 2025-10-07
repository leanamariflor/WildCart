package com.appdev.wildcart_backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appdev.wildcart_backend.Entity.BuyerEntity;
import com.appdev.wildcart_backend.Service.BuyerService;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired
    private BuyerService buyerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody BuyerEntity buyer) {
        try {
            BuyerEntity savedBuyer = buyerService.registerBuyer(buyer);
            return ResponseEntity.ok(savedBuyer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BuyerEntity loginData) {
        try {
            BuyerEntity buyer = buyerService.loginBuyer(loginData.getEmail(), loginData.getPassword());
            return ResponseEntity.ok(buyer);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
