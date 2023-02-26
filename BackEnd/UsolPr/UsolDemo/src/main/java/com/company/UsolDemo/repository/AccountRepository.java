package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Account;
import com.company.UsolDemo.models.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    public Optional<Account> findByEmail(String email);
    public Optional<Account> findByEmailAndPassword(String email, String password);
    @Procedure("proc_DeleteAccount")
    public void DeleteAccount(@Param("id") long id);
    @Procedure("get_getAccountId")
    public List<Object[]> findByIDAcc(@Param("id") long id);
    @Query(value = "SELECT a FROM Account a WHERE a.fullName LIKE %:fullName%")
    Page<Account> findByFullNameContaining(@Param("fullName") String fullName, Pageable pageable);
}
