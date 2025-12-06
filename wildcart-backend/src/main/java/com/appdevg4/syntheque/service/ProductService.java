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

    public ProductEntity updateProduct(Long id, ProductEntity updated) {
        return repo.findById(id).map(existing -> {

            existing.setName(updated.getName());
            existing.setPrice(updated.getPrice());
            existing.setDescription(updated.getDescription());
            existing.setStocks(updated.getStocks());
            existing.setAddress(updated.getAddress());
            existing.setNoteToBuyer(updated.getNoteToBuyer());

            existing.setCategory(updated.getCategory());
            applyCategoryBinding(existing);

            // Update images
            existing.setImageUrls(updated.getImageUrls());

            return repo.save(existing);

        }).orElse(null);
    }

    private void applyCategoryBinding(ProductEntity product) {
        if (product.getCategoryEntity() == null &&
                product.getCategory() != null &&
                !product.getCategory().isBlank()) {
            categoryRepo.findByName(product.getCategory().trim())
                    .ifPresent(product::setCategoryEntity);
        }

        if (product.getCategoryEntity() != null &&
                (product.getCategory() == null || product.getCategory().isBlank())) {
            product.setCategory(product.getCategoryEntity().getName());
        }
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
