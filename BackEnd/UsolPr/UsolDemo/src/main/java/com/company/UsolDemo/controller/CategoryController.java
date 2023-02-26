package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.models.dto.CategoryDto;
import com.company.UsolDemo.service.BrandService;
import com.company.UsolDemo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Category> categories = service.getAll();
            return ResponseEntity.ok(categories);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getAll/findByCategoryName")
    public ResponseEntity<?> findByBrandNameContaining(@RequestParam("categoryName") String categoryName,
                                                       @RequestParam("offset") int offset,
                                                       @RequestParam("pageSize") int pageSize,
                                                       @RequestParam("field") String field) {
        try {
            Page<Category> categories = service.findByCategoryNameContaining(categoryName, PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(categories);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Category category = service.findById(id);
            return ResponseEntity.ok(category);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PostMapping(value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insert(@RequestParam("categoryName") String categoryName,
                                    @RequestParam("categoryImage") MultipartFile categoryImage){
        try {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setCategoryName(categoryName);
            categoryDto.setCategoryImage(categoryImage);
            return ResponseEntity.ok(service.save(categoryDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PutMapping(value = "/withImage/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateWithImage(@RequestParam("categoryName") String categoryName,
                                             @RequestParam("categoryImage") MultipartFile categoryImage,
                                             @PathVariable Long id) {
        try {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setCategoryName(categoryName);
            categoryDto.setCategoryImage(categoryImage);
            return ResponseEntity.ok(service.update(categoryDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("categoryName") String categoryName,
                                           @PathVariable Long id) {
        try {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setCategoryName(categoryName);
            return ResponseEntity.ok(service.update(categoryDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.delete(id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
}
