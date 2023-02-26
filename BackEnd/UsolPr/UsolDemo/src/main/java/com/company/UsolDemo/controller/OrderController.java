package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Order;
import com.company.UsolDemo.models.dto.BillDTO;
import com.company.UsolDemo.models.dto.OrderDTO;
import com.company.UsolDemo.service.AccountService;
import com.company.UsolDemo.service.OrderService;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService service;

    @Autowired
    private AccountService accountService;
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Order> orders = service.getAll();
            return ResponseEntity.ok(orders);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Order order = service.findById(id);
            return ResponseEntity.ok(order);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestParam("orderStatus") int orderStatus,@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.update(orderStatus, id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
    //Lấy đơn hàng
    @GetMapping ("/getallorder")
    public ResponseEntity<?> GetAllOrder(){
        try {
            List<OrderDTO> productDTOS=service.GetOrder();
            return  ResponseEntity.ok(productDTOS);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
    //xác nhân đơn hàng
    @PutMapping("/updateorder/{id}")
    public ResponseEntity<?> UpdateOrder(@PathVariable long id){
        try {
            service.UpdateOrder(id);
            return  ResponseEntity.ok(200);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
    //Xóa đơn hàng
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            service.DeleteOrder(id);
            return ResponseEntity.ok(201);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    //đặt hàng

    @PostMapping("/dathang/{accountid}")
    public ResponseEntity<?>Order(@PathVariable long accountid,@RequestParam("productid") long productid,@RequestParam("quantity") int quantity){
        try {
            service.Order(accountid,productid,quantity);
            return  ResponseEntity.ok(200);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
    //xem hóa đơn theo id khách hàng
    @GetMapping("/xemhoadon/{id}")
    @Transactional
    public ResponseEntity<?>Order(@PathVariable long id){
        try {
            List<BillDTO> billDTOS=service.GetBill(id);
            return  ResponseEntity.ok(billDTOS);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
    @PostMapping("/huydonhang/{id}")
    public ResponseEntity<?> HuyDonHang(@PathVariable long id){
        try {
            service.HuyDonHang(id);
            return  ResponseEntity.ok(200);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

}
