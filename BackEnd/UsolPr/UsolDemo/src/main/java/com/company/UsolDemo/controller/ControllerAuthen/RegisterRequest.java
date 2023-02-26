package com.company.UsolDemo.controller.ControllerAuthen;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String userName;
    @Size(min = 3, max = 25, message = "Tên phải nằm trong 3 đến 25 ký tự")
    private String fullName;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Password cần ít nhất 1 chữ hoa và 1 chữ thường và có độ dài ít nhất là 8")
    private String password;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @Pattern(regexp = "^0\\d{9}$", message = "Số điện thoại không đúng")
    private String phone;
    @Email(message = "email không đúng")
    private String email;
}
