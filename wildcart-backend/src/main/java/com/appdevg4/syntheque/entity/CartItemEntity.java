package com.appdevg4.syntheque.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnoreProperties({"items"})   // prevent recursion
    private CartEntity cart;

  @ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "product_id")
@JsonIgnoreProperties({
    "hibernateLazyInitializer",
    "handler",
    "categoryEntity",
    "imageUrls"
})
private ProductEntity product;


    public CartItemEntity() {}

    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public CartEntity getCart() { return cart; }
    public void setCart(CartEntity cart) { this.cart = cart; }

    public ProductEntity getProduct() { return product; }
    public void setProduct(ProductEntity product) { this.product = product; }
}