package com.appdev.wildcart_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.wildcart_backend.Entity.BuyerEntity;

@Repository
public interface BuyerRepository extends JpaRepository<BuyerEntity, Long> {
    BuyerEntity findByEmail(String email);
}
