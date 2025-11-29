package com.appdevg4.syntheque.controller;

import com.appdevg4.syntheque.entity.ProductEntity;
import com.appdevg4.syntheque.service.ProductService;
import com.appdevg4.syntheque.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;
    private final CloudinaryService cloudinaryService;

    public ProductController(ProductService service, CloudinaryService cloudinaryService) {
        this.service = service;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductEntity> addProduct(@RequestBody ProductEntity product) {
        return ResponseEntity.ok(service.addProduct(product));
    }

    @GetMapping
    public ResponseEntity<List<ProductEntity>> getProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProductById(id));
    }

    
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            String url = cloudinaryService.uploadImage(file);
            urls.add(url);
        }

        return ResponseEntity.ok(urls);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.ok("Product deleted");
    }

}
