package com.company.UsolDemo.controller;


import com.company.UsolDemo.controller.ControllerAuthen.ErrorResponse;
import com.company.UsolDemo.controller.ControllerAuthen.RegisterRequest;
import com.company.UsolDemo.models.Account;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.AccountDto;
import com.company.UsolDemo.models.dto.AccountNew;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.service.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/account")

public class AccountController {
    @Autowired
    private AccountService service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Account> accounts = service.getAll();
            return ResponseEntity.ok(accounts);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getAll/findByFullName")
    public ResponseEntity<?> findByBrandNameContaining(@RequestParam("fullName") String fullName,
                                                       @RequestParam("offset") int offset,
                                                       @RequestParam("pageSize") int pageSize,
                                                       @RequestParam("field") String field) {
        try {
            Page<Account> accounts = service.findByFullNameContaining(fullName, PageRequest.of(offset,pageSize).withSort(Sort.by(field)));
            return ResponseEntity.ok(accounts);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @GetMapping("/getbyid/{id}")
    @Transactional
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            List<AccountNew> account =service.findByAccID(id);
            return ResponseEntity.ok(account);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
    /*@PostMapping(value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insert(@RequestParam("userName") String userName,
                                    @RequestParam("fullName") String fullName,
                                    @RequestParam("password") String password,
                                    @RequestParam("address") String address,
                                    @RequestParam("phone") String phone,
                                    @RequestParam("email") String email,
                                    @RequestParam("accountImage") MultipartFile accountImage,
                                    @RequestParam("accountStatus") int accountStatus,
                                    @RequestParam("accountRole") int accountRole) {
        try {
            AccountDto accountDto = new AccountDto(password, userName, fullName, address, phone, email, accountImage, accountRole, accountStatus);
            return ResponseEntity.ok(service.save(accountDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }*/


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestParam("userName") String userName,
                                    @RequestParam("fullName") String fullName,
                                    @RequestParam("address") String address,
                                    @RequestParam("phone") String phone,
                                    @RequestParam("email") String email,
                                    @RequestParam("image") MultipartFile image) {
        try {
            AccountDto accountDto = new AccountDto(userName, fullName, address, phone, email, image);
            return ResponseEntity.ok(service.UpdateAccount(id, accountDto));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/changepass/{id}")
    public ResponseEntity<?> ChangPass(@PathVariable Long id, @RequestParam String pass) {
        try {
            Account account = new Account(pass);
            return ResponseEntity.ok(service.ChangePassword(id, account));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PostMapping("/sendpass")
    public ResponseEntity<?> SendPassword(@RequestParam("email") String email) {
        try {
            String status = service.SendPassword(email);
            return ResponseEntity.ok(status);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    //export account data excel chi can goi toi link localhost:8080/account/exportacccount/excel và gan link len thanh tim kiem goolge
// thi tu dong tai file excel ve


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.delete(id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }

    @PutMapping("/updateAccount/{id}")
    public ResponseEntity<?> updateNoImage(@Valid @RequestBody RegisterRequest request,
                                           @PathVariable Long id, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()){
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getDefaultMessage())
                        .collect(Collectors.joining(", "));
                return ResponseEntity.badRequest().body(new ErrorResponse(errorMessage));
            }
            return ResponseEntity.ok(service.update(request,id));
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
}
