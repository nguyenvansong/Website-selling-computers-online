package com.company.UsolDemo.controller.ControllerAuthen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatonResponse1 {
    private String token;
    private long id;
}
