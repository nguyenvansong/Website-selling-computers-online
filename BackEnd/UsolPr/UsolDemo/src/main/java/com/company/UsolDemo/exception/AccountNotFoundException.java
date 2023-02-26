package com.company.UsolDemo.exception;

public class AccountNotFoundException extends RuntimeException{
    public AccountNotFoundException(Long id) {
        super("Could not found the account with id= "+ id);
    }
    public AccountNotFoundException(String mess) {
        super(mess);
    }
}
