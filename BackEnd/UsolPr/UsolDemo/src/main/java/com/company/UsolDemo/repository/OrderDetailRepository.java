package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.CourseRatingKey;
import com.company.UsolDemo.models.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, CourseRatingKey> {
    @Query(value = "SELECT sum(od.product.price * od.orderQuantity) FROM OrderDetail od " +
            "WHERE YEAR(od.order.orderDate) = :year AND MONTH(od.order.orderDate) =:month")
    double monthlyRevenue(@Param("year") int year, @Param("month") int month);

    @Query(value = "SELECT sum(od.product.price * od.orderQuantity) FROM OrderDetail od " +
            "WHERE YEAR(od.order.orderDate) = YEAR(CURDATE()) AND MONTH(od.order.orderDate) =MONTH(CURDATE())")
    double monthlyRevenue();

    //    @Query(value = "SELECT od.product.productID,sum(od.orderQuantity) FROM OderDetail od " +
//            "GROUP BY od.product.productID " +
//            "ORDER BY sum(od.orderQuantity)" +
//            "LIMIT 5")
//    List<TopProduct> topProductSell();
    @Query(value = "SELECT od FROM OrderDetail od " +
            "WHERE od.order.account.fullName LIKE %:fullName% " +
            "OR od.product.productName LIKE %:fullName%")
    Page<OrderDetail> findByAccountName(@Param("fullName") String fullName, Pageable pageable);
}
