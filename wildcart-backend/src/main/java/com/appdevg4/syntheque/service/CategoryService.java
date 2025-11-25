package com.appdevg4.syntheque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdevg4.syntheque.entity.CategoryEntity;
import com.appdevg4.syntheque.repository.CategoryRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // CREATE
    public CategoryEntity insertCategory(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    // READ 
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    //UPDATE
    @SuppressWarnings("finally")
    public CategoryEntity updateCategory(int id, CategoryEntity newCategory) {
        CategoryEntity category = null;

        try {
            category = categoryRepository.findById(id).get();
            category.setName(newCategory.getName());
            category = categoryRepository.save(category);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Category ID " + id + " does not exist!");
        } finally {
            return categoryRepository.save(category);
        }
    }

    // DELETE
    public String deleteCategory(int id) {
        String msg = "";
        if (categoryRepository.findById(id).isPresent()) {
            categoryRepository.deleteById(id);
            msg = "Category " + id + " is successfully deleted!";
        } else {
            msg = "Category " + id + " does not exist.";
        }
        return msg;
    }
}
