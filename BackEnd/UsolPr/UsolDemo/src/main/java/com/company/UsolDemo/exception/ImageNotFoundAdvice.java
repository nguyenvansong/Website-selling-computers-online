package com.company.UsolDemo.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ImageNotFoundAdvice {
    @ResponseBody
    @ResponseStatus
    @ExceptionHandler(ImageNotFoundException.class)
    public Map<String,String> exceptionHandler(ImageNotFoundException e){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMap",e.getMessage());
        return errorMap;
    }
}
