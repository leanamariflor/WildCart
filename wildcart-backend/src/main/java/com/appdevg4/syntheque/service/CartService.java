package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.CartEntity;
import com.appdevg4.syntheque.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;

	public CartEntity createCart(CartEntity cart) {
		return cartRepository.save(cart);
	}

	public CartEntity getOrCreateCart(Long cartId) {
		if (cartId != null) {
			Optional<CartEntity> existing = cartRepository.findById(cartId);
			if (existing.isPresent()) {
				return existing.get();
			}
		}
		// Create new cart
		CartEntity newCart = new CartEntity();
		newCart.setDateCreated(LocalDateTime.now());
		return cartRepository.save(newCart);
	}

	public Optional<CartEntity> getCart(Long id) {
		return cartRepository.findById(id);
	}

	public List<CartEntity> getAllCarts() {
		return cartRepository.findAll();
	}

	public CartEntity updateCart(Long id, CartEntity cartDetails) {
		return cartRepository.findById(id)
				.map(cart -> {
					cart.setDateCreated(cartDetails.getDateCreated());
					return cartRepository.save(cart);
				})
				.orElse(null);
	}

	public void deleteCart(Long id) {
		cartRepository.deleteById(id);
	}
}

