package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.ProductEntity;
import com.appdevg4.syntheque.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public ProductEntity addProduct(ProductEntity product) {
        return repo.save(product);
    }

    public List<ProductEntity> getAllProducts() {
        return repo.findAll();
    }

    public ProductEntity getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

}
