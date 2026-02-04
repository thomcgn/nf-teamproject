package com.example.backend.security;

import org.springframework.beans.factory.annotation.Value;
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

    @Value("${app.frontend.url}")
    private String frontendUrl;

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
                        .defaultSuccessUrl(frontendUrl + "/recipes", true))
                .logout(l -> l
                        .logoutSuccessUrl(frontendUrl + "/")
                );
        return http.build();
    }
}
