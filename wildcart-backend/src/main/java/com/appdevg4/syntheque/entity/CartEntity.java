package com.appdevg4.syntheque.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
public class CartEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;

	private LocalDateTime dateCreated = LocalDateTime.now();

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CartItemEntity> items = new ArrayList<>();

	public CartEntity() {}

	public Long getCartId() { return cartId; }
	public void setCartId(Long cartId) { this.cartId = cartId; }

	public LocalDateTime getDateCreated() { return dateCreated; }
	public void setDateCreated(LocalDateTime dateCreated) { this.dateCreated = dateCreated; }

	public List<CartItemEntity> getItems() { return items; }
	public void setItems(List<CartItemEntity> items) { this.items = items; }
}