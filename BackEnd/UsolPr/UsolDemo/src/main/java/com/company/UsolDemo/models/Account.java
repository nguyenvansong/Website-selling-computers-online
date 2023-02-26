package com.company.UsolDemo.models;

import com.company.UsolDemo.models.dto.AccountDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Account")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long accountID;
    @Column(name = "UserName")
    private String userName;

    @Column(name = "FullName")
    private String fullName;
    @Column(name = "Password")

    private String password;
    @Column(name = "Address")

    private String address;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Email")
    private String email;
    @Column(name = "Image")
    private String accountImage;
    @Column(name = "Status")
    private int accountStatus;
    @Enumerated(EnumType.STRING)
    private Role role;

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private Collection<Order> orders;

    public Account(AccountDto accountDto) {
        this.accountID = accountDto.getAccountID();
        this.userName = accountDto.getUserName();
        this.fullName = accountDto.getFullName();
        this.address = accountDto.getAddress();
        this.phone = accountDto.getPhone();
        this.email = accountDto.getEmail();
    }

    public Account(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    /*public Account(String userName, String fullName, String password, String address, String phone, String email, int accountStatus, int accountRole) {
        this.userName = userName;
        this.fullName = fullName;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.accountStatus = accountStatus;
        this.accountRole = accountRole;
    }*/
}
