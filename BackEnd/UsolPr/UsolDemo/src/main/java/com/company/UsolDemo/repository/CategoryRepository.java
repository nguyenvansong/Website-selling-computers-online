package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query(value = "SELECT c FROM Category c WHERE c.categoryName LIKE %:categoryName%")
    Page<Category> findByCategoryNameContaining(@Param("categoryName") String categoryName, Pageable pageable);
}
