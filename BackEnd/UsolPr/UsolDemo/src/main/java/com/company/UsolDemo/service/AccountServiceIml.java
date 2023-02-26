package com.company.UsolDemo.service;

import com.company.UsolDemo.controller.ControllerAuthen.RegisterRequest;
import com.company.UsolDemo.exception.AccountNotFoundException;
import com.company.UsolDemo.exception.BrandNotFoundException;
import com.company.UsolDemo.models.Account;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.dto.AccountDto;
import com.company.UsolDemo.models.dto.AccountNew;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.repository.AccountRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mail.javamail.JavaMailSender;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AccountServiceIml implements AccountService{
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    @Autowired
    private AccountRepository repo;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;
    @Override
    public Account save(AccountDto accountDto) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AccountDto>> violations = validator.validate(accountDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<AccountDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        Account account = new Account();
        account.setUserName(accountDto.getUserName());
        account.setFullName(accountDto.getFullName());
        account.setAddress(accountDto.getAddress());
        account.setPhone(accountDto.getPhone());
        account.setEmail(accountDto.getEmail());
        account.setAccountStatus(accountDto.getAccountStatus());
        getImageFromDto(accountDto,account);
        account.setPassword(accountDto.getPassword());
        return repo.save(account);
    }

    @Override
    public void Registration(Account account) {
        String image="";
        account.setAccountImage(image);
        BCryptPasswordEncoder bcript=new BCryptPasswordEncoder();
        String passEncode= bcript.encode(account.getPassword());
        account.setPassword(passEncode);
        repo.save(account);
    }
    private static void getImageFromDto(AccountDto accountDto, Account account) {
        MultipartFile image=accountDto.getAccountImage();
        Path path = Paths.get("uploads/account/");
        if(image.isEmpty()){
            account.setAccountImage("default.jpg");
        }
        try {
            InputStream inputStream = image.getInputStream();
            Files.copy(inputStream,path.resolve(image.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            account.setAccountImage(image.getOriginalFilename().toLowerCase());
        }catch (Exception ex){

        }
    }

    @Override
    public Account UpdateAccount(long id,AccountDto accountDto) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AccountDto>> violations = validator.validate(accountDto);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<AccountDto> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        return repo.findById(id)
                .map(account -> {
                    account.setUserName(accountDto.getUserName());
                    account.setFullName(accountDto.getFullName());
                    account.setAddress(accountDto.getAddress());
                    account.setPhone(accountDto.getPhone());
                    account.setEmail(accountDto.getEmail());
                    MultipartFile image=accountDto.getAccountImage();
                    Path path = Paths.get("uploads/account/");
                    if(image.isEmpty()){
                        account.setAccountImage("default.jpg");
                    }
                    try {
                        InputStream inputStream = image.getInputStream();
                        Files.copy(inputStream,path.resolve(image.getOriginalFilename()),
                                StandardCopyOption.REPLACE_EXISTING);
                        account.setAccountImage(image.getOriginalFilename().toLowerCase());
                    }catch (Exception ex){
                    }
                    return repo.save(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }


    @Override
    public List<Account> getAll() {
        return repo.findAll();
    }

    @Override
    public Account update(RegisterRequest request, Long id) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            List<String> errorMessages = new ArrayList<>();
            for (ConstraintViolation<RegisterRequest> violation : violations) {
                errorMessages.add(violation.getMessage());
            }
            throw new AccountNotFoundException("Account is invalid: " + String.join(", ", errorMessages));
        }
        return repo.findById(id)
                .map(account -> {
                    account.setUserName(request.getUserName());
                    account.setFullName(request.getFullName());
                    BCryptPasswordEncoder bcript=new BCryptPasswordEncoder();
                    String passEncode= bcript.encode(request.getPassword());
                    account.setPassword(passEncode);
                    account.setAddress(request.getAddress());
                    account.setPhone(request.getPhone());
                    account.setEmail(request.getEmail());
                    account.setAccountImage("");
                    account.setAccountStatus(1);
                    account.setRole(account.getRole());
                    return repo.save(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }


    @Override
    public String delete(Long id) {
        if(!repo.existsById(id)){
            throw new AccountNotFoundException(id);
        }
        repo.deleteById(id);
        return "Account with id "+ id +" id has been deleted success!";
    }

    @Override
    public Account ChangePassword(long id, Account accountDto) {
        return repo.findById(id)
                .map(account -> {
                    BCryptPasswordEncoder bcript=new BCryptPasswordEncoder();
                    String passEncode= bcript.encode(account.getPassword());
                    account.setPassword(passEncode);
                    return repo.save(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }

    @Override
    public Account UpdateAccountAd(long id, Account account1,MultipartFile image) {
        return repo.findById(id)
                .map(account -> {
                    //account.setUserName(account1.getUserName());
                    account.setFullName(account1.getFullName());
                    account.setPassword(account1.getPassword());
                    account.setAddress(account1.getAddress());
                    account.setPhone(account1.getPhone());
                    account.setEmail(account1.getEmail());
                    Path path = Paths.get("uploads/account/");
                    if(image.isEmpty()){
                        account.setAccountImage("defaul.jpg");
                    }
                    try {
                        InputStream inputStream = image.getInputStream();
                        Files.copy(inputStream,path.resolve(image.getOriginalFilename()),
                                StandardCopyOption.REPLACE_EXISTING);
                        account.setAccountImage(image.getOriginalFilename().toLowerCase());
                    }catch (IOException ex){
                        ex.printStackTrace();
                    }
                    account.setAccountStatus(account1.getAccountStatus());
                    return repo.save(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }
    public static long RandomPass(long min, long max){
        double randompass = Math.random() * (max - min + 1) + min;
        return (long) randompass;
    }
    @Override
    public String SendPassword(String email) {
        Optional<Account> account=repo.findByEmail(email);
        long pass=RandomPass(100000,999999);
        if(account==null){
            return "Email không có trong hệ thống";
        }
        else {
            try {
                // Creating a simple mail message
                SimpleMailMessage mailMessage= new SimpleMailMessage();
                // Setting up necessary details
                mailMessage.setFrom(sender);
                mailMessage.setTo(email);
                mailMessage.setText("Mật khẩu mới của bạn là: "+pass);
                mailMessage.setSubject("Lấy lại mật khẩu");
                // Sending the mail
                /*account.setPassword(Long.toString(pass));
                repo.save(account);*/
                javaMailSender.send(mailMessage);
                return "Mail Sent Successfully...";
            }
            catch (Exception e) {
                return e.getMessage();
            }
        }


    }

    @Override
    public Account findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new AccountNotFoundException(id));
    }

    @Override
    public List<AccountNew> findByAccID(long id) {
        List<AccountNew> accountNews=repo.findByIDAcc(id).stream().map((value)-> {
            Long accountId=(Long)value[0];
            String user=(String) value[1];
            String fullname=(String) value[2];
            String address=(String) value[3];
            String phone=(String) value[4];
            String email=(String) value[5];
            String role=(String) value[6];
            Integer status=(Integer) value[7];
            return new AccountNew(accountId,user,fullname,address,phone,email,role,status);
        }).collect(Collectors.toList());
        return  accountNews;
    }

    @Override
    public Page<Account> findByFullNameContaining(String fullName, Pageable pageable) {
        return repo.findByFullNameContaining(fullName,pageable);
    }
}
