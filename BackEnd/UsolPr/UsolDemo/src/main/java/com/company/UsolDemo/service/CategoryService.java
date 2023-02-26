package com.company.UsolDemo.service;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.dto.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    Category save(CategoryDto categoryDto);
    List<Category> getAll();
    Category findById(Long id);
    Category update(CategoryDto categoryDto,Long id);
    String delete(Long id);
    Page<Category> findByCategoryNameContaining(String categoryName, Pageable pageable);
}
