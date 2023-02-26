package com.company.UsolDemo.models;

import com.company.UsolDemo.models.dto.BrandDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Brand")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long brandId;
    @Column(name = "BrandName")
    private String brandName;

    @Column(name = "BrandImage")
    private String brandImage;

    @Override
    public String toString() {
        return brandName;
    }
}
