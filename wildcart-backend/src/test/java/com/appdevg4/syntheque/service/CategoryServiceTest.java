package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.CategoryEntity;
import com.appdevg4.syntheque.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryService service;

    @Test
    void insertCategory_shouldReturnSaved() {
        CategoryEntity toSave = new CategoryEntity(0, "Books");
        CategoryEntity saved = new CategoryEntity(13, "Books");
        when(repository.save(toSave)).thenReturn(saved);

        CategoryEntity result = service.insertCategory(toSave);

        assertEquals(13, result.getCategoryId());
        verify(repository).save(toSave);
    }

    @Test
    void getAllCategories_shouldReturnList() {
        List<CategoryEntity> list = Arrays.asList(
                new CategoryEntity(1, "A"),
                new CategoryEntity(2, "B")
        );
        when(repository.findAll()).thenReturn(list);

        List<CategoryEntity> result = service.getAllCategories();

        assertEquals(2, result.size());
        verify(repository).findAll();
    }

    @Test
    void updateCategory_existing_shouldSave() {
        CategoryEntity existing = new CategoryEntity(3, "Old");
        CategoryEntity update = new CategoryEntity(3, "New");

        when(repository.findById(3)).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenReturn(update);

        CategoryEntity result = service.updateCategory(3, update);

        assertEquals("New", result.getName());
        verify(repository).findById(3);
        verify(repository).save(existing);
    }

    @Test
    void updateCategory_missing_shouldThrow() {
        when(repository.findById(99)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.updateCategory(99, new CategoryEntity()));
    }

    @Test
    void deleteCategory_existing_shouldReturnSuccessMessage() {
        CategoryEntity e = new CategoryEntity(4, "x");
        when(repository.findById(4)).thenReturn(Optional.of(e));

        String msg = service.deleteCategory(4);

        assertTrue(msg.contains("successfully deleted"));
        verify(repository).deleteById(4);
    }

    @Test
    void deleteCategory_missing_shouldReturnNotExistMessage() {
        when(repository.findById(42)).thenReturn(Optional.empty());

        String msg = service.deleteCategory(42);

        assertTrue(msg.contains("does not exist"));
    }
}
