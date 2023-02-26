package com.company.UsolDemo.service;

import com.company.UsolDemo.controller.ControllerAuthen.RegisterRequest;
import com.company.UsolDemo.models.Account;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.dto.AccountDto;
import com.company.UsolDemo.models.dto.AccountNew;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AccountService {
    Account save(AccountDto accountDto);
    void Registration(Account account);
    Account UpdateAccount(long id,AccountDto accountDto);
    List<Account> getAll();
    Account update(RegisterRequest request, Long id);
    String delete(Long id);
    Account ChangePassword(long id,Account accountDto);

    //Admin
    //thay doi quyen cho account
    Account UpdateAccountAd(long id, Account account,MultipartFile image);
    String SendPassword(String email);
    Account findById(Long id);
    List<AccountNew> findByAccID(long id);
    Page<Account> findByFullNameContaining(String fullName, Pageable pageable);
}
