package com.company.UsolDemo.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CategoryNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(CategoryNotFoundException.class)
    @ResponseStatus
    public Map<String,String> exceptionHandler(CategoryNotFoundException e){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMap",e.getMessage());
        return errorMap;
    }
}
