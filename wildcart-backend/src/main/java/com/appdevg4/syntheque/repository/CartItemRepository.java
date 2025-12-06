package com.appdevg4.syntheque.repository;

import com.appdevg4.syntheque.entity.CartEntity;
import com.appdevg4.syntheque.entity.CartItemEntity;
import com.appdevg4.syntheque.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    List<CartItemEntity> findByCart_CartId(Long cartId);
    Optional<CartItemEntity> findByCartAndProduct(CartEntity cart, ProductEntity product);
}