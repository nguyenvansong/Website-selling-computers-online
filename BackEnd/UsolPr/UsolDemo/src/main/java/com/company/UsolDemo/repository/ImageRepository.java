package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {
    List<Image> findByProductProductID(Long id);
    @Query(value = "SELECT i FROM Image i WHERE i.product.productName LIKE %:productName%")
    Page<Image> findByProductNameContaining(@Param("productName") String productName, Pageable pageable);
}
