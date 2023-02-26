package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private Long id;
    private MultipartFile imageName;
    private Product product;
}
