package com.company.UsolDemo.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Long id) {
        super("Could not found the order with id= "+ id);
    }
}
