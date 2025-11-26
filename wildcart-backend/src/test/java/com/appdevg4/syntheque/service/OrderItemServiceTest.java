package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.OrderItemEntity;
import com.appdevg4.syntheque.repository.OrderItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderItemServiceTest {

    @Mock
    private OrderItemRepository repository;

    @InjectMocks
    private OrderItemService service;

    @Test
    void insertOrderItem_shouldReturnSaved() {
        OrderItemEntity toSave = new OrderItemEntity(0, 1, "Product A", 2, 10.0);
        OrderItemEntity saved = new OrderItemEntity(5, 1, "Product A", 2, 10.0);
        when(repository.save(toSave)).thenReturn(saved);

        OrderItemEntity result = service.insertOrderItem(toSave);

        assertEquals(5, result.getOrderItemId());
        verify(repository).save(toSave);
    }

    @Test
    void getAllOrderItems_shouldReturnList() {
        List<OrderItemEntity> list = Arrays.asList(
                new OrderItemEntity(1, 1, "A", 1, 5.0),
                new OrderItemEntity(2, 1, "B", 3, 12.0)
        );
        when(repository.findAll()).thenReturn(list);

        List<OrderItemEntity> result = service.getAllOrderItems();

        assertEquals(2, result.size());
        verify(repository).findAll();
    }

    @Test
    void getOrderItemsByOrderId_shouldReturnOnlyOrderItemsForOrder() {
        List<OrderItemEntity> list = Arrays.asList(new OrderItemEntity(1, 7, "X", 2, 20.0));
        when(repository.findByOrderId(7)).thenReturn(list);

        List<OrderItemEntity> result = service.getOrderItemsByOrderId(7);

        assertEquals(1, result.size());
        assertEquals(7, result.get(0).getOrderId());
    }

    @Test
    void updateOrderItem_existing_shouldSave() {
        OrderItemEntity existing = new OrderItemEntity(3, 2, "Old", 1, 2.0);
        OrderItemEntity update = new OrderItemEntity(3, 2, "New", 5, 3.0);

        when(repository.findById(3)).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenReturn(update);

        OrderItemEntity result = service.updateOrderItem(3, update);

        assertEquals("New", result.getProductName());
        assertEquals(5, result.getQuantity());
        verify(repository).findById(3);
        verify(repository).save(existing);
    }

    @Test
    void updateOrderItem_missing_shouldThrow() {
        when(repository.findById(99)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.updateOrderItem(99, new OrderItemEntity()));
    }

    @Test
    void deleteOrderItem_existing_shouldReturnSuccessMessage() {
        OrderItemEntity e = new OrderItemEntity(4, 3, "x", 1, 1.0);
        when(repository.findById(4)).thenReturn(Optional.of(e));

        String msg = service.deleteOrderItem(4);

        assertTrue(msg.contains("successfully deleted"));
        verify(repository).deleteById(4);
    }

    @Test
    void deleteOrderItem_missing_shouldReturnNotExistMessage() {
        when(repository.findById(42)).thenReturn(Optional.empty());

        String msg = service.deleteOrderItem(42);

        assertTrue(msg.contains("does not exist"));
    }
}
