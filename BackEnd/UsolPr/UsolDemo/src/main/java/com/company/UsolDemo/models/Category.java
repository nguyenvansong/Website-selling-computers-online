package com.company.UsolDemo.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryID;
    @Column(name = "CategoryName")
    private String categoryName;

    @Column(name = "CategoryImage")
    private String categoryImage;

    @Override
    public String toString() {
        return categoryName;
    }
}
