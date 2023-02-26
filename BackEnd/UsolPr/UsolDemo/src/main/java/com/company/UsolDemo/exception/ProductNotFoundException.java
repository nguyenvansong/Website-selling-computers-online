package com.company.UsolDemo.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Could not found the product with id= "+ id);
    }
    public ProductNotFoundException(String mess) {
        super(mess);
    }
}
