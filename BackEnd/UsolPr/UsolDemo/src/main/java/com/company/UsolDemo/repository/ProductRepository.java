package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
//    @Query("INSERT INTO p FROM")
    List<Product> findByProductName(String name);
    @Query("select p from Product p where concat(p.productName,' ',p.price,' ',p.brand.brandId,' ',p.category.categoryID) like %?1%")
    public List<Product> search(String keyword);
    @Procedure("proc_Top5")
    public List<Object[]> getAllTop5();
    List<Product> findByCategoryCategoryID(Long id);
    List<Product> findByBrandBrandId(Long id);
    @Query(value = "SELECT p FROM Product p WHERE p.productName LIKE %:productName%")
    Page<Product> findByProductNameContaining(@Param("productName") String productName, Pageable pageable);
}
