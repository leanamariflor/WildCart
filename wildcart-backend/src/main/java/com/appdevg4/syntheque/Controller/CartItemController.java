package com.appdevg4.syntheque.controller;

import com.appdevg4.syntheque.entity.CartItemEntity;
import com.appdevg4.syntheque.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {
	@Autowired
	private CartItemService cartItemService;

	@PostMapping
	public CartItemEntity createCartItem(@RequestBody CartItemEntity item) {
		return cartItemService.createCartItem(item);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CartItemEntity> getCartItem(@PathVariable Long id) {
		return cartItemService.getCartItem(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<CartItemEntity> getAllCartItems() {
		return cartItemService.getAllCartItems();
	}

	@PutMapping("/{id}")
	public ResponseEntity<CartItemEntity> updateCartItem(@PathVariable Long id, @RequestBody CartItemEntity itemDetails) {
		CartItemEntity updated = cartItemService.updateCartItem(id, itemDetails);
		if (updated == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
		cartItemService.deleteCartItem(id);
		return ResponseEntity.noContent().build();
	}
    //added
    
@PostMapping("/add")
public ResponseEntity<CartItemEntity> addToCartItem(@RequestBody CartItemEntity cartItem) {
    // You may want to associate with a specific cart (e.g., buyer's cart)
    CartItemEntity savedItem = cartItemService.createCartItem(cartItem);
    return ResponseEntity.ok(savedItem);
}

}