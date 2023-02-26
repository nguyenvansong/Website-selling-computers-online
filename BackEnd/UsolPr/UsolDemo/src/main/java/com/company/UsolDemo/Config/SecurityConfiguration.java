package com.company.UsolDemo.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors().and()
                .authorizeHttpRequests()
                .requestMatchers("/account/add").permitAll()

                .requestMatchers("/api/v1/auth/register").permitAll()
                .requestMatchers("/api/v1/auth/registerad").permitAll()
                .requestMatchers("/api/v1/auth/authenticate").permitAll()
                .requestMatchers("/api/v1/auth/authenticate1").permitAll()
                .requestMatchers("/account/getAll").permitAll()
                .requestMatchers("/account/getAll/findByFullName").permitAll()
                .requestMatchers("/account/{id}").permitAll()
                .requestMatchers("/account/getbyid/{id}").permitAll()
                .requestMatchers("/account/updateAccount/**").permitAll()
                .requestMatchers("/brand/getAll").permitAll()
                .requestMatchers("/brand/**").permitAll()
                .requestMatchers("/brand/getAll/findByBrandName").permitAll()
                .requestMatchers("/brand/getById/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/search").permitAll()
                .requestMatchers("/product/getAll").permitAll()
                .requestMatchers("/product/add").permitAll()
                .requestMatchers("/product/getAll/findByProductName").permitAll()
                .requestMatchers("/product/gettop5").permitAll()
                .requestMatchers("/product/getbyname").permitAll()
                .requestMatchers("/product/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/delete/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/update/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/noImage/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/withImage/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/category/getAll").permitAll()
                .requestMatchers("/category/getAll/findByCategoryName").permitAll()
                .requestMatchers("/category/**").permitAll()
                .requestMatchers("/category/getById/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/category/withImage/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/category/noImage/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/image/getAll").permitAll()
                .requestMatchers("/image/getAll/findByProductName").permitAll()
                .requestMatchers("/image/productid/**").permitAll()
                .requestMatchers("/getimage/**").permitAll()
                .requestMatchers("/image/**").permitAll()
                .requestMatchers("/order/dathang/**").hasAnyAuthority("USER")
                .requestMatchers("/order/getAll").hasAnyAuthority("ADMIN")
                .requestMatchers("/orderdetail/monthlyRevenue").permitAll()
                .requestMatchers("/orderdetail/monthlyRevenue/month").permitAll()
                .requestMatchers("/orderdetail/getAll/findByFullName").permitAll()
                .requestMatchers("/order/update/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/order/getallorder").hasAnyAuthority("ADMIN")
                .requestMatchers("/order/updateorder").hasAnyAuthority("ADMIN")

                .requestMatchers("/order/xemhoadon/**").permitAll()
                .requestMatchers("/order/delete/**").hasAnyAuthority("ADMIN","USER")
                .requestMatchers("/order/huydonhang/**").hasAnyAuthority("USER")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Địa chỉ của ứng dụng web của bạn
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
