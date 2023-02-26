package com.company.UsolDemo.service;

import com.company.UsolDemo.exception.AccountNotFoundException;
import com.company.UsolDemo.exception.BrandNotFoundException;
import com.company.UsolDemo.exception.CategoryNotFoundException;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.models.dto.CategoryDto;
import com.company.UsolDemo.repository.BrandRepository;
import com.company.UsolDemo.repository.CategoryRepository;
import com.company.UsolDemo.repository.ProductRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.backoff.BackOff;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
public class CategoryServiceIml implements CategoryService{
    @Autowired
    private CategoryRepository repo;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Category save(CategoryDto categoryDto) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<CategoryDto>> violations = validator.validate(categoryDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<CategoryDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        Category category = new Category();
        category.setCategoryName(categoryDto.getCategoryName());

        getImageFromDto(categoryDto,category);

        return repo.save(category);
    }

    private static void getImageFromDto(CategoryDto categoryDto, Category category) {
        MultipartFile image = categoryDto.getCategoryImage();

        Path path = Paths.get("uploads/category");
        if (image.isEmpty()) {
            category.setCategoryImage("default.jpg");
        }
        try {
            InputStream inputStream = image.getInputStream();
            Files.copy(inputStream, path.resolve(image.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            category.setCategoryImage(image.getOriginalFilename().toLowerCase());

        } catch (Exception ex) {

        }
    }

    @Override
    public List<Category> getAll() {
        return repo.findAll();
    }

    @Override
    public Category findById(Long id) {
        return repo.findById(id)
                .orElseThrow(()->new CategoryNotFoundException(id));
    }

    @Override
    public Category update(CategoryDto categoryDto, Long id) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<CategoryDto>> violations = validator.validate(categoryDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<CategoryDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        return repo.findById(id)
                .map(category -> {
                    if (categoryDto.getCategoryName().equals("")==false) {
                        category.setCategoryName(categoryDto.getCategoryName());
                    }
                    if (categoryDto.getCategoryImage() != null) {
                        getImageFromDto(categoryDto, category);
                    }
                    return repo.save(category);
                }).orElseThrow(()->new CategoryNotFoundException(id));
    }

    @Override
    public String delete(Long id) {
        if(!repo.existsById(id)){
            throw new CategoryNotFoundException(id);
        }
        if(productRepository.findByCategoryCategoryID(id).size() != 0){
            throw new CategoryNotFoundException("Tồn tại sản phẩm. Không được xóa");
        }
        repo.deleteById(id);
        return "Order with id "+ id +" id has been deleted success!";
    }

    @Override
    public Page<Category> findByCategoryNameContaining(String categoryName, Pageable pageable) {
        return repo.findByCategoryNameContaining(categoryName,pageable);
    }
}
