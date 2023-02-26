package com.company.UsolDemo.service;

import com.company.UsolDemo.models.OrderDetail;
import com.company.UsolDemo.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceIml implements OrderDetailService{
    @Autowired
    OrderDetailRepository repo;
    @Override
    public double monthlyRevenue(int year, int month) {
        try{
            return repo.monthlyRevenue(year,month);
        }
        catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public double monthlyRevenue() {
        return repo.monthlyRevenue();
    }

    @Override
    public Page<OrderDetail> findByAccountName(String fullName, Pageable pageable) {
        return repo.findByAccountName(fullName,pageable);
    }

//    @Override
//    public List<TopProduct> topProductSell() {
//        return repo.topProductSell();
//    }
}
