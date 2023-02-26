package com.company.UsolDemo.service;

import com.company.UsolDemo.controller.ControllerAuthen.RegisterRequest;
import com.company.UsolDemo.exception.AccountNotFoundException;
import com.company.UsolDemo.exception.BrandNotFoundException;
import com.company.UsolDemo.exception.CategoryNotFoundException;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.repository.BrandRepository;
import com.company.UsolDemo.repository.ProductRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class BrandServiceIml implements BrandService {
    @Autowired
    private BrandRepository repo;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Brand save(BrandDto brandDto) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<BrandDto>> violations = validator.validate(brandDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<BrandDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        Brand brand = new Brand();
        brand.setBrandName(brandDto.getBrandName());

        getImageFromDto(brandDto, brand);

        return repo.save(brand);
    }

    private static void getImageFromDto(BrandDto brandDto, Brand brand) {
        MultipartFile image = brandDto.getBrandImage();
        Path path = Paths.get("uploads/brand");
        if (image.isEmpty()) {
            brand.setBrandImage("default.jpg");
        }
        try {
            InputStream inputStream = image.getInputStream();
            Files.copy(inputStream, path.resolve(image.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            brand.setBrandImage(image.getOriginalFilename().toLowerCase());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public List<Brand> getAll() {
        return repo.findAll();
    }

    @Override
    public Brand findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new BrandNotFoundException(id));
    }

    @Override
    public Brand update(BrandDto brandDto, Long id) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<BrandDto>> violations = validator.validate(brandDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<BrandDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        return repo.findById(id)
                .map(brand -> {
                    if (brandDto.getBrandName().equals("")==false) {
                        brand.setBrandName(brandDto.getBrandName());
                    }
                    if (brandDto.getBrandImage() != null) {
                        getImageFromDto(brandDto, brand);
                    }
                    return repo.save(brand);
                }).orElseThrow(() -> new BrandNotFoundException(id));
    }

    @Override
    public String delete(Long id) {
        if (!repo.existsById(id)) {
            throw new BrandNotFoundException(id);
        }
        if(productRepository.findByBrandBrandId(id).size() != 0){
            throw new BrandNotFoundException("Tồn tại sản phẩm. Không được xóa");
        }
        repo.deleteById(id);
        return "Brand with id " + id + " id has been deleted success!";
    }

    @Override
    public Page<Brand> findByBrandNameContaining(String brandName, Pageable pageable) {
        return repo.findByBrandNameContaining(brandName,pageable);
    }
}
