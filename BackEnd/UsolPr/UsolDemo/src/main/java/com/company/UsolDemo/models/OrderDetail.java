package com.company.UsolDemo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    @EmbeddedId
    private CourseRatingKey id;
    @Column(name = "OrderQuantity")
    private int orderQuantity;
    @ManyToOne
    @MapsId("OrderID")
    @JoinColumn(name = "OrderID")
    private Order order;


    @ManyToOne
    @MapsId("ProductID")
    @JoinColumn(name = "ProductID")
    private Product product;
}
