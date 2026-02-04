package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
                        .requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/auth/logout").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/recipe", "/api/recipe/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/recipe", "/api/recipe/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/recipe", "/api/recipe/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/ingredients", "/api/ingredients/**").authenticated()
                        .anyRequest().permitAll()
                )
                .oauth2Login(o -> o
                        .defaultSuccessUrl("http://localhost:5173/recipe", true))
                .logout(l -> l
                        .logoutSuccessUrl("http://localhost:5173/")
                );
        return http.build();
    }
}
