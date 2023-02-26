package com.company.UsolDemo.models;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "OrderProduct")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;
    @Column(name = "OrderDate")
    private Date orderDate;
    @Column(name = "OrderStatus")
    private int orderStatus;
    @ManyToOne
    @JoinColumn(name = "accountID") // thông qua khóa ngoại address_id
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Account account;

}
