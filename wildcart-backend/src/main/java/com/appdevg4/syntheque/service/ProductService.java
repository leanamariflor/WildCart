package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.ProductEntity;
import com.appdevg4.syntheque.entity.CategoryEntity;
import com.appdevg4.syntheque.repository.ProductRepository;
import com.appdevg4.syntheque.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;
    private final CategoryRepository categoryRepo;

    public ProductService(ProductRepository repo, CategoryRepository categoryRepo) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    public ProductEntity addProduct(ProductEntity product) {
        if (product.getCategoryEntity() == null && product.getCategory() != null && !product.getCategory().isBlank()) {
            categoryRepo.findByName(product.getCategory().trim())
                .ifPresent(product::setCategoryEntity);
        }
        
        if (product.getCategoryEntity() != null && (product.getCategory() == null || product.getCategory().isBlank())) {
            product.setCategory(product.getCategoryEntity().getName());
        }
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
