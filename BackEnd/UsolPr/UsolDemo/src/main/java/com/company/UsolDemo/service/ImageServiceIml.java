package com.company.UsolDemo.service;

import com.company.UsolDemo.exception.BrandNotFoundException;
import com.company.UsolDemo.exception.ImageNotFoundException;
import com.company.UsolDemo.models.Image;
import com.company.UsolDemo.models.dto.ImageDto;
import com.company.UsolDemo.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ImageServiceIml implements ImageService {
    @Autowired
    ImageRepository repo;

    @Override
    public Image save(ImageDto imageDto) {
        Image image = new Image();
        image.setProduct(imageDto.getProduct());
        getImageFromDto(imageDto,image);
        return repo.save(image);
    }

    private static void getImageFromDto(ImageDto brandDto,Image image) {
        MultipartFile file = brandDto.getImageName();

        Path path = Paths.get("uploads/image");
        if (file.isEmpty()) {
            image.setImageName("default.jpg");
        }
        try {
            InputStream inputStream = file.getInputStream();
            Files.copy(inputStream, path.resolve(file.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            image.setImageName(file.getOriginalFilename().toLowerCase());

        } catch (Exception ex) {

        }
    }

    @Override
    public List<Image> getAll() {
        return repo.findAll();
    }

    @Override
    public Image findById(Long id) {
        return repo.findById(id)
                .orElseThrow(()->new ImageNotFoundException(id));
    }

    @Override
    public Image update(ImageDto imageDto, Long id) {
        return repo.findById(id)
                .map(image -> {
                    image.setProduct(imageDto.getProduct());
                    if (imageDto.getImageName() != null) {
                        getImageFromDto(imageDto, image);
                    }
                    return repo.save(image);
                }).orElseThrow(() -> new BrandNotFoundException(id));
    }

    @Override
    public String delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ImageNotFoundException(id);
        }
        repo.deleteById(id);
        return "Image with id " + id + " id has been deleted success!";
    }

    @Override
    public List<Image> getImageProductId(Long id) {
        return repo.findByProductProductID(id);
    }

    @Override
    public Page<Image> findByProductNameContaining(String productName, Pageable pageable) {
        return repo.findByProductNameContaining(productName,pageable);
    }
}
