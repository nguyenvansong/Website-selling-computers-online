package com.company.UsolDemo.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor

public class AccountNew {
    private long id;
    private String userName;
    @Size(min = 5, max = 30, message = "Tên phải nằm trong 5 đến 30 ký tự")
    private String fullName;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @Pattern(regexp = "^0\\d{9}$", message = "Số điện thoại không đúng")
    private String phone;
    @Email(message = "email không đúng")
    private String email;
    private String accountRole;
    private int accountStatus;
}
