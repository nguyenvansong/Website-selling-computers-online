package com.company.UsolDemo.models.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Long categoryID;
    @Size(min = 3, max = 255, message = "Tên phải nằm trong 3 đến 255 ký tự")
    @NotBlank(message = "Tên không được để trống")
    private String categoryName;
    private MultipartFile categoryImage;
}
