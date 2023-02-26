package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.OrderDetail;
import com.company.UsolDemo.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orderdetail")
public class OrderDetailController {
    @Autowired
    private OrderDetailService service;

    @GetMapping("/monthlyRevenue")
    private ResponseEntity<?> monthlyRevenue(@RequestParam("year") int year,
                                             @RequestParam("month") int month) {
        try {
            return ResponseEntity.ok(service.monthlyRevenue(year, month));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/monthlyRevenue/month")
    private ResponseEntity<?> monthlyRevenue() {
        try {
            return ResponseEntity.ok(service.monthlyRevenue());
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }


    }

    //    @GetMapping("/top5product")
//    private ResponseEntity<?> topProductSell(){
//        return ResponseEntity.ok(service.topProductSell());
//    }
    @GetMapping("/getAll/findByFullName")
    private ResponseEntity<?> findByAccountName(@RequestParam("fullName") String fullName,
                                                @RequestParam("offset") int offset,
                                                @RequestParam("pageSize") int pageSize,
                                                @RequestParam("field") String field) {
        try {
            Page<OrderDetail> orderDetailDTOS = service.findByAccountName(fullName, PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(orderDetailDTOS);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
}
