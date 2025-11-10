package com.appdev.wildcart_backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appdev.wildcart_backend.Entity.SellerEntity;
import com.appdev.wildcart_backend.Repository.SellerRepository;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public SellerEntity registerSeller(SellerEntity seller) throws Exception {
        // Trim email to avoid whitespace issues
        String email = seller.getEmail().trim().toLowerCase();

         // 🧾 Debug logs — to confirm what’s happening
    System.out.println("Checking email: " + email);

        SellerEntity existingSeller = sellerRepository.findByEmail(email);
       System.out.println("Existing seller: " + existingSeller); // will print null if not found
       
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
        existingSeller.setEmail(updatedSeller.getEmail().trim().toLowerCase());
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
}
