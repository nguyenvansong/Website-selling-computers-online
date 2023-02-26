package com.company.UsolDemo.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Could not found the category with id= "+ id);
    }
    public CategoryNotFoundException(String mess) {
        super(mess);
    }
}
