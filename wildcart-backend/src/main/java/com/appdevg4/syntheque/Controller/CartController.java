package com.appdevg4.syntheque.controller;

import com.appdevg4.syntheque.entity.CartEntity;
import com.appdevg4.syntheque.entity.CartItemEntity;
import com.appdevg4.syntheque.entity.ProductEntity;
import com.appdevg4.syntheque.repository.ProductRepository;
import com.appdevg4.syntheque.service.CartItemService;
import com.appdevg4.syntheque.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carts")
public class CartController {
	@Autowired
	private CartService cartService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private ProductRepository productRepository;

	@PostMapping
	public CartEntity createCart(@RequestBody CartEntity cart) {
		return cartService.createCart(cart);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CartEntity> getCart(@PathVariable Long id) {
		return cartService.getCart(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<CartEntity> getAllCarts() {
		return cartService.getAllCarts();
	}

	@PostMapping("/addToCart")
	public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> request) {
		Long cartId = request.get("cartId") != null ? ((Number) request.get("cartId")).longValue() : null;
		Long productId = ((Number) request.get("productId")).longValue();
		int quantity = request.get("quantity") != null ? ((Number) request.get("quantity")).intValue() : 1;

		// Get or create cart
		CartEntity cart = cartService.getOrCreateCart(cartId);

		// Get product
		ProductEntity product = productRepository.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product not found"));

		// Add to cart
		CartItemEntity cartItem = cartItemService.addToCart(cart, product, quantity);

		return ResponseEntity.ok(Map.of(
				"cartId", cart.getCartId(),
				"cartItem", cartItem
		));
	}

	@GetMapping("/{id}/items")
	public ResponseEntity<List<CartItemEntity>> getCartItems(@PathVariable Long id) {
		List<CartItemEntity> items = cartItemService.getCartItemsByCartId(id);
		return ResponseEntity.ok(items);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CartEntity> updateCart(@PathVariable Long id, @RequestBody CartEntity cartDetails) {
		CartEntity updated = cartService.updateCart(id, cartDetails);
		if (updated == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
		cartService.deleteCart(id);
		return ResponseEntity.noContent().build();
	}
}