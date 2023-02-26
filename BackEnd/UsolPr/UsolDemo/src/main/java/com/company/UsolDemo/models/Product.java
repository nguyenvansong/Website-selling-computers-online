package com.company.UsolDemo.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Product")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "productID")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    @Column(name = "ProductName")
    private String productName;
    @Column(name = "ProductPrice")

    private double price;
    @Column(name = "ProductDescription")

    private String productDecription;
    @Column(name = "Discount")
    private double discount;
    @Column(name = "ProductCreated")
    private Date productCreated;

    @Column(name = "ProductImage")
    private String productImage;

    @ManyToOne
    @JoinColumn(name = "BrandID")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "CategoryID")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Category category;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "productid")
    @JsonIgnore
    private List<Image> images = new ArrayList<>();

    @Override
    public String toString() {
        return productName;
    }
}
