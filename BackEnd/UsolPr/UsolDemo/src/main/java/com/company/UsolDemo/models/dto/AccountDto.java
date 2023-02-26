package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Account;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private Long accountID;
    @NotBlank(message = "password không được đê trống")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Password cần ít nhất 1 chữ hoa và 1 chữ thường và có độ dài ít nhất là 8")
    private String password;
    private String userName;
    @Size(min = 3, max = 25, message = "Tên phải nằm trong 3 đến 25 ký tự")
    @NotBlank(message = "Tài khoản không được đê trống")
    private String fullName;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @Pattern(regexp = "^0\\d{9}$", message = "Số điện thoại không đúng")
    private String phone;
    @Email(message = "email không đúng")
    private String email;
    private MultipartFile accountImage;
    private int accountRole;
    private int accountStatus;

    public AccountDto(String userName, String fullName, String address, String phone, String email, MultipartFile accountImage) {
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountImage = accountImage;
    }

    public AccountDto(String password, String userName, String fullName, String address, String phone, String email, MultipartFile accountImage, int accountRole, int accountStatus) {
        this.password = password;
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountImage = accountImage;
        this.accountRole = accountRole;
        this.accountStatus = accountStatus;
    }

    public AccountDto(String password, String userName, String fullName, String address, String phone, String email, int accountRole, int accountStatus) {
        this.password = password;
        this.userName = userName;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountRole = accountRole;
        this.accountStatus = accountStatus;
    }
}
