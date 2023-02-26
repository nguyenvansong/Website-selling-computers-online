package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Order;
import com.company.UsolDemo.models.dto.BillDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query(value = "CALL  `usoldb`.proc_getOrder",nativeQuery = true)
    public List<Object[]> GetOrder();

    @Procedure("Update_order")
    public void UpdateOrder(@Param("id") long id);

    //xoa don hang
    @Procedure("pro_deleteOrder")
    public void DeleteOrder(@Param("id") long id);
    @Procedure("proc_dathang")
    public void InsertOder(@RequestParam("accountid") long accountid, @RequestParam("productId") long productId, @RequestParam("quantity") int quantity);

    //xem hoa dơn
    @Procedure("proc_xemhoadon")
    public List<Object[]> GetBill(@Param("id") long id);
    @Procedure("proc_HuyDonHang")
    public void HuyDonHang(@Param("id") long id);

}
