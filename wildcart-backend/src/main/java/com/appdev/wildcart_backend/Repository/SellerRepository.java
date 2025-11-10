package com.appdev.wildcart_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appdev.wildcart_backend.Entity.SellerEntity;

@Repository
public interface SellerRepository extends JpaRepository<SellerEntity, Long> {
    SellerEntity findByEmail(String email);
}
