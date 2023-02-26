package com.company.UsolDemo;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@CrossOrigin
public class ImageUploadController {
    @RequestMapping(value = "getimage/image/{image}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String image){
        if(!image.equals("")||image != null){
            try {
                Path fileName = Paths.get("uploads/image",image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            }catch (Exception ex){

            }
        }
        return ResponseEntity.badRequest().build();
    }
    @RequestMapping(value = "getimage/brand/{image}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getBrandImage(@PathVariable String image){
        if(!image.equals("")||image != null){
            try {
                Path fileName = Paths.get("uploads/brand",image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            }catch (Exception ex){

            }
        }
        return ResponseEntity.badRequest().build();
    }
    @RequestMapping(value = "getimage/category/{image}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getCategoryImage(@PathVariable String image){
        if(!image.equals("")||image != null){
            try {
                Path fileName = Paths.get("uploads/category",image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            }catch (Exception ex){

            }
        }
        return ResponseEntity.badRequest().build();
    }
    @RequestMapping(value = "getimage/account/{image}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getAccountImage(@PathVariable String image){
        if(!image.equals("")||image != null){
            try {
                Path fileName = Paths.get("uploads/account",image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            }catch (Exception ex){

            }
        }
        return ResponseEntity.badRequest().build();
    }
    @RequestMapping(value = "getimage/product/{image}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getProductImage(@PathVariable String image){
        if(!image.equals("")||image != null){
            try {
                Path fileName = Paths.get("uploads/product",image);
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            }catch (Exception ex){

            }
        }
        return ResponseEntity.badRequest().build();
    }
}
