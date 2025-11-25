package com.appdevg4.syntheque.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appdevg4.syntheque.entity.SellerEntity;

@Repository
public interface SellerRepository extends JpaRepository<SellerEntity, Long> {
    SellerEntity findByEmail(String email);
}
