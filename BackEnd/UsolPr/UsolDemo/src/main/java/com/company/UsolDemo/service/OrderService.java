package com.company.UsolDemo.service;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Order;
import com.company.UsolDemo.models.dto.BillDTO;
import com.company.UsolDemo.models.dto.OrderDTO;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {
    Order save(Order newOrder);
    List<Order> getAll();
    Order findById(Long id);
    Order update(int orderStatus,Long id);
    String delete(Long id);

    List<OrderDTO> GetOrder();
    public void UpdateOrder(long id);
    public void Order(long accountid, long productid,int quatity);
    //xem hóa đơn
    public List<BillDTO> GetBill(long id);
    public void HuyDonHang(long id);
    public void DeleteOrder(long id);
}
