package com.company.UsolDemo.service;

import com.company.UsolDemo.models.Image;
import com.company.UsolDemo.models.dto.ImageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    Image save(ImageDto imageDto);
    List<Image> getAll();
    Image findById(Long id);
    Image update(ImageDto imageDto,Long id);
    String delete(Long id);
    List<Image> getImageProductId(Long id);
    Page<Image> findByProductNameContaining(String productName, Pageable pageable);
}
