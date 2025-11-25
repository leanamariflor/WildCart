package com.appdevg4.syntheque.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdevg4.syntheque.entity.BuyerEntity;

@Repository
public interface BuyerRepository extends JpaRepository<BuyerEntity, Long> {
    BuyerEntity findByEmail(String email);
}
