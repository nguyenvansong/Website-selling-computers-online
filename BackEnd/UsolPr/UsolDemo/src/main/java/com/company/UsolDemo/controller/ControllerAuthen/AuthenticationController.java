package com.company.UsolDemo.controller.ControllerAuthen;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid
            @RequestBody RegisterRequest request, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getDefaultMessage())
                        .collect(Collectors.joining(", "));
                return ResponseEntity.badRequest().body(new ErrorResponse(errorMessage));
            }
            AuthenticationResponse response = service.register(request);
            return ResponseEntity.ok(response);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PostMapping("/registerad")
    public ResponseEntity<?> registerad(@Valid
            @RequestBody RegisterRequest request,BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getDefaultMessage())
                        .collect(Collectors.joining(", "));
                return ResponseEntity.badRequest().body(new ErrorResponse(errorMessage));
            }
            AuthenticationResponse response = service.registerad(request);
            return ResponseEntity.ok(response);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@Valid
            @RequestBody AuthenticationRequest request
    ) {
        String email = request.getEmail();
        String password = request.getPassword();
        try {
            if (!service.isAccountExist(email, password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            AuthenticationResponse response = service.authenticate(request);
            return ResponseEntity.ok(response);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }

    }
    @PostMapping("/authenticatead")
    public ResponseEntity<AuthenticationResponse> authenticatead(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/authenticate1")
    public ResponseEntity<?> authenticate1(@RequestBody AuthenticationRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        try {
            if (!service.isAccountExist(email, password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            AuthenticatonResponse1 respone1= service.authenticate1(request);
            return ResponseEntity.ok(respone1);
        }catch (Exception ex){
            Map<String,String> errorMessage = new HashMap<>();
            errorMessage.put("devMsg", ex.getMessage());
            errorMessage.put("userMsg","Có lỗi xẩy ra vui lòng liên hệ Dat 09 để được hỗ trợ!");
            return ResponseEntity.status(500).body(errorMessage);
        }
    }
}
