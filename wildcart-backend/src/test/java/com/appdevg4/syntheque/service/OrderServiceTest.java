package com.appdevg4.syntheque.service;

import com.appdevg4.syntheque.entity.OrderEntity;
import com.appdevg4.syntheque.repository.OrderRepository;
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
public class OrderServiceTest {

    @Mock
    private OrderRepository repository;

    @InjectMocks
    private OrderService service;

    @Test
    void insertOrder_shouldReturnSaved() {
        OrderEntity toSave = new OrderEntity(0, "Order A", 100.0, "NEW");
        OrderEntity saved = new OrderEntity(7, "Order A", 100.0, "NEW");
        when(repository.save(toSave)).thenReturn(saved);

        OrderEntity result = service.insertOrder(toSave);

        assertEquals(7, result.getOrderId());
        verify(repository).save(toSave);
    }

    @Test
    void getAllOrders_shouldReturnList() {
        List<OrderEntity> list = Arrays.asList(
                new OrderEntity(1, "A", 10.0, "NEW"),
                new OrderEntity(2, "B", 12.0, "PAID")
        );
        when(repository.findAll()).thenReturn(list);

        List<OrderEntity> result = service.getAllOrders();

        assertEquals(2, result.size());
        verify(repository).findAll();
    }

    @Test
    void updateOrder_existing_shouldSave() {
        OrderEntity existing = new OrderEntity(3, "Old", 1.0, "NEW");
        OrderEntity update = new OrderEntity(3, "New", 2.5, "PAID");

        when(repository.findById(3)).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenReturn(update);

        OrderEntity result = service.updateOrder(3, update);

        assertEquals("New", result.getOrderName());
        assertEquals("PAID", result.getStatus());
        verify(repository).findById(3);
        verify(repository).save(existing);
    }

    @Test
    void updateOrder_missing_shouldThrow() {
        when(repository.findById(99)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.updateOrder(99, new OrderEntity()));
    }

    @Test
    void deleteOrder_existing_shouldReturnSuccessMessage() {
        OrderEntity e = new OrderEntity(4, "x", 1.0, "NEW");
        when(repository.findById(4)).thenReturn(Optional.of(e));

        String msg = service.deleteOrder(4);

        assertTrue(msg.contains("successfully deleted"));
        verify(repository).deleteById(4);
    }

    @Test
    void deleteOrder_missing_shouldReturnNotExistMessage() {
        when(repository.findById(42)).thenReturn(Optional.empty());

        String msg = service.deleteOrder(42);

        assertTrue(msg.contains("does not exist"));
    }
}
