package com.appdevg4.syntheque.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdevg4.syntheque.entity.CategoryEntity;
import com.appdevg4.syntheque.service.CategoryService;

import java.util.List;


@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // CREATE
    @PostMapping("/insertCategory")
    public CategoryEntity addCategory(@RequestBody CategoryEntity category) {
        return categoryService.insertCategory(category);
    }

    // READ ALL
    @GetMapping("/getAllCategory")
    public List<CategoryEntity> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // UPDATE
    @PutMapping("/update/updateCategory")
    public CategoryEntity updateCategory(@RequestParam int id, @RequestBody CategoryEntity category) {
        return categoryService.updateCategory(id, category);
    }

    // DELETE
    @DeleteMapping("/delete/deleteCategory/{id}")
    public String deleteCategory(@PathVariable int id) {
        return categoryService.deleteCategory(id);
    }

}
