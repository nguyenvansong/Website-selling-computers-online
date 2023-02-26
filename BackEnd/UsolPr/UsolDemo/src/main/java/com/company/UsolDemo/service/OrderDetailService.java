package com.company.UsolDemo.service;

import com.company.UsolDemo.models.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderDetailService {
    double monthlyRevenue(int year,int month);
    double monthlyRevenue();
//    List<TopProduct> topProductSell();
    Page<OrderDetail> findByAccountName(String fullName, Pageable pageable);
}
