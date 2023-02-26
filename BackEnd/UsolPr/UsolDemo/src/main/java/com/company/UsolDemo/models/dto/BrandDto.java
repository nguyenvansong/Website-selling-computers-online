package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Brand;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {
    private Long brandId;
    @Size(min = 3, max = 255, message = "Tên phải nằm trong 3 đến 255 ký tự")
    @NotBlank(message = "Tên không được để trống")
    private String brandName;
    private MultipartFile brandImage;
}
