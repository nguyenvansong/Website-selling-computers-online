package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.AccountDto;
import com.company.UsolDemo.models.dto.ProductDto;
import com.company.UsolDemo.models.dto.Top5ProductDto;
import com.company.UsolDemo.repository.BrandRepository;
import com.company.UsolDemo.repository.CategoryRepository;
import com.company.UsolDemo.service.BrandService;
import com.company.UsolDemo.service.CategoryService;
import com.company.UsolDemo.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @GetMapping("/search")
    public ResponseEntity<?> Search(@RequestParam String keyword) {
        try {
            List<Product> listProducts = service.listAll(keyword);
            return ResponseEntity.ok(listProducts);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Product> products = service.getAll();
            return ResponseEntity.ok(products);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getAll/findByProductName")
    public ResponseEntity<?> findByProductNameContaining(@RequestParam("productName") String productName,
                                                       @RequestParam("offset") int offset,
                                                       @RequestParam("pageSize") int pageSize,
                                                       @RequestParam("field") String field) {
        try {
            Page<Product> products = service.findByProductNameContaining(productName, PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(products);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Product product = service.findById(id);
            return ResponseEntity.ok(product);
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
    public ResponseEntity<?> insert(@RequestParam("productName") String productName,
                                    @RequestParam("price") double price,
                                    @RequestParam("productDecription") String productDecription,
                                    @RequestParam("discount") double discount,
                                    @RequestParam("productImage") MultipartFile productImage,
                                    @RequestParam("categoryId") Long categoryId,
                                    @RequestParam("brandId") Long brandId){
        try {
            ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId),productImage);
            return ResponseEntity.ok(service.save(productDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody ProductDto productDto,@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.update(productDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/withImage/{id}")
    public ResponseEntity<?> updateWithImage(@RequestParam("productName") String productName,
                                             @RequestParam("price") double price,
                                             @RequestParam("productDecription") String productDecription,
                                             @RequestParam("discount") double discount,
                                             @RequestParam("productImage") MultipartFile productImage,
                                             @RequestParam("categoryId") Long categoryId,
                                             @RequestParam("brandId") Long brandId,
                                             @PathVariable Long id) {
        try {
            ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId),productImage);
            return ResponseEntity.ok(service.update(productDto,id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("productName") String productName,
                                           @RequestParam("price") double price,
                                           @RequestParam("productDecription") String productDecription,
                                           @RequestParam("discount") double discount,
                                           @RequestParam("categoryId") Long categoryId,
                                           @RequestParam("brandId") Long brandId,
                                           @PathVariable Long id) {
        try {
            ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId));
            return ResponseEntity.ok(service.update(productDto,id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @DeleteMapping("/delete/{id}")
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

    @GetMapping("/getbyname")
    public ResponseEntity<?> findById(@RequestParam String name) {
        try {
            List<Product> productList=service.getAllByName(name);
            return ResponseEntity.ok(productList);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
    @GetMapping("/gettop5")
    @Transactional
    public ResponseEntity<?> GetTop5() {
        try {
            List<Top5ProductDto> top5Products=service.getTop5Pro();
            return ResponseEntity.ok(top5Products);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
}
