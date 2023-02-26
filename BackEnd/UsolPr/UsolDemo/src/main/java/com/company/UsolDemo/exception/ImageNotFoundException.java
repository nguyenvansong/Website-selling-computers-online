package com.company.UsolDemo.exception;

public class ImageNotFoundException extends RuntimeException{
    public ImageNotFoundException(Long id) {
        super("Could not found the image with id= "+ id);
    }
}
