package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Image;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.ImageDto;
import com.company.UsolDemo.service.ImageService;
import com.company.UsolDemo.service.ProductService;
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
@RequestMapping("/image")
@CrossOrigin
public class ImageController {
    @Autowired
    private ImageService service;

    @Autowired
    private ProductService productService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<Image> images = service.getAll();
        return ResponseEntity.ok(images);
    }
    @GetMapping("/getAll/findByProductName")
    public ResponseEntity<?> findByProductNameContaining(@RequestParam("productName") String productName,
                                                       @RequestParam("offset") int offset,
                                                       @RequestParam("pageSize") int pageSize,
                                                       @RequestParam("field") String field) {
        try {
            Page<Image> images = service.findByProductNameContaining(productName, PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(images);
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
            Image image = service.findById(id);
            return ResponseEntity.ok(image);
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
    public ResponseEntity<?> insert(@RequestParam("imageName") MultipartFile imageName,
                                    @RequestParam("productId") Long productId) {
        try {
            ImageDto imageDto = new ImageDto();
            imageDto.setImageName(imageName);
            imageDto.setProduct(productService.findById(productId));
            return ResponseEntity.ok(service.save(imageDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PutMapping("/withImage/{id}")
    public ResponseEntity<?> updateWithImage(@RequestParam("imageName") MultipartFile imageName,
                                             @RequestParam("productId") Long productId,
                                             @PathVariable Long id) {
        try {
            ImageDto imageDto = new ImageDto();
            imageDto.setImageName(imageName);
            imageDto.setProduct(productService.findById(productId));
            return ResponseEntity.ok(service.update(imageDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("productId") Long productId,
                                           @PathVariable Long id) {
        try {
            ImageDto imageDto = new ImageDto();
            imageDto.setProduct(productService.findById(productId));
            return ResponseEntity.ok(service.update(imageDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.delete(id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @GetMapping("/productid/{id}")
    public ResponseEntity<?> getByProductId(@PathVariable Long id){
        try {
            List<Image> images = service.getImageProductId(id);
            return ResponseEntity.ok(images);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
}
