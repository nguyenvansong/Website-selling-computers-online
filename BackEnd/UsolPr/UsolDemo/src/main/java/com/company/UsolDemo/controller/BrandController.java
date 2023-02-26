package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.service.BrandService;
import jakarta.validation.constraints.NotBlank;
import org.apache.poi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/brand")
@CrossOrigin
public class BrandController {
    @Autowired
    private BrandService service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Brand> brands = service.getAll();
            return ResponseEntity.ok(brands);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getAll/findByBrandName")
    public ResponseEntity<?> findByBrandNameContaining(@RequestParam("brandName") String brandName,
                                    @RequestParam("offset") int offset,
                                    @RequestParam("pageSize") int pageSize,
                                    @RequestParam("field") String field) {
        try {
            Page<Brand> brands = service.findByBrandNameContaining(brandName,PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(brands);
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
            Brand brand = service.findById(id);
            return ResponseEntity.ok(brand);
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
    public ResponseEntity<?> insert(@RequestParam("brandName") String brandName,
                                    @RequestParam("brandImage") MultipartFile brandImage) {
        try {
            BrandDto brandDto = new BrandDto();
            brandDto.setBrandName(brandName);
            brandDto.setBrandImage(brandImage);
            return ResponseEntity.ok(service.save(brandDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PutMapping("/withImage/{id}")
    public ResponseEntity<?> updateWithImage(@RequestParam("brandName") String brandName,
                                    @RequestParam("brandImage") MultipartFile brandImage,
                                    @PathVariable Long id) {
        try {
            BrandDto newBrandDto = new BrandDto();
            newBrandDto.setBrandName(brandName);
            newBrandDto.setBrandImage(brandImage);
            return ResponseEntity.ok(service.update(newBrandDto, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("brandName") String brandName,
                                    @PathVariable Long id) {
        try {
            BrandDto newBrandDto = new BrandDto();
            newBrandDto.setBrandName(brandName);
            return ResponseEntity.ok(service.update(newBrandDto, id));
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
}
