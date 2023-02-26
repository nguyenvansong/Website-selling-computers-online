package com.company.UsolDemo.models.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Top5ProductDto {
    private String proName;
    private String proImage;
    private double price;
    private BigDecimal quantity;

}
