package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Image;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long productID;
    @NotBlank(message = "Tên không được để trống")
    private String productName;
    @Min(value = 0, message = "Giá không được nhỏ hơn 0")
    private double price;
    @NotBlank(message = "Mô tả không được để trống")
    private String productDecription;
    @Min(value = 0, message = "Giảm giá không được nhỏ hơn 0")
    @Max(value = 100, message = "Giảm giá không được lớn hơn 100")
    private double discount;
    private Date productCreated;
    private Brand brand;
    private Category category;
    private MultipartFile productImage;
    private List<Image> images = new ArrayList<>();

    public ProductDto(String productName, double price, String productDecription, double discount, Brand brand, Category category) {
        this.productName = productName;
        this.price = price;
        this.productDecription = productDecription;
        this.discount = discount;
        this.brand = brand;
        this.category = category;
    }

    public ProductDto(String productName, double price, String productDecription, double discount, Brand brand, Category category, MultipartFile productImage) {
        this.productName = productName;
        this.price = price;
        this.productDecription = productDecription;
        this.discount = discount;
        this.brand = brand;
        this.category = category;
        this.productImage = productImage;
    }

}
