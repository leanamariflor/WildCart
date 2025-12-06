package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.CartEntity;
import com.appdevg4.syntheque.entity.CartItemEntity;
import com.appdevg4.syntheque.entity.ProductEntity;
import com.appdevg4.syntheque.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
	@Autowired
	private CartItemRepository cartItemRepository;

	public CartItemEntity createCartItem(CartItemEntity item) {
		return cartItemRepository.save(item);
	}

	public CartItemEntity addToCart(CartEntity cart, ProductEntity product, int quantity) {
		// Check if product already in cart
		Optional<CartItemEntity> existing = cartItemRepository.findByCartAndProduct(cart, product);
		
		if (existing.isPresent()) {
			// Update quantity
			CartItemEntity item = existing.get();
			item.setQuantity(item.getQuantity() + quantity);
			return cartItemRepository.save(item);
		} else {
			// Create new cart item
			CartItemEntity newItem = new CartItemEntity();
			newItem.setCart(cart);
			newItem.setProduct(product);
			newItem.setQuantity(quantity);
			return cartItemRepository.save(newItem);
		}
	}

	public Optional<CartItemEntity> getCartItem(Long id) {
		return cartItemRepository.findById(id);
	}

	public List<CartItemEntity> getAllCartItems() {
		return cartItemRepository.findAll();
	}

	public List<CartItemEntity> getCartItemsByCartId(Long cartId) {
		return cartItemRepository.findByCart_CartId(cartId);
	}

	public CartItemEntity updateCartItem(Long id, CartItemEntity itemDetails) {
		return cartItemRepository.findById(id)
				.map(item -> {
					item.setQuantity(itemDetails.getQuantity());
					item.setProduct(itemDetails.getProduct());
					item.setCart(itemDetails.getCart());
					return cartItemRepository.save(item);
				})
				.orElse(null);
	}

	public void deleteCartItem(Long id) {
		cartItemRepository.deleteById(id);
	}
}