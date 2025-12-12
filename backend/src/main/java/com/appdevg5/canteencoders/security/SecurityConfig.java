package com.appdevg5.canteencoders.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
public SecurityFilterChain securityFilterChain(
    HttpSecurity http,
    JwtAuthenticationFilter jwtAuthFilter,
    AuthenticationProvider authenticationProvider
) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(ex -> ex
            .authenticationEntryPoint(new RestAuthenticationEntryPoint())
            .accessDeniedHandler(new StealthAccessDeniedHandler())
        )
        .authorizeHttpRequests(authz -> authz
            // 1. PUBLIC AUTH ENDPOINTS (only login/register)
            .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
            // Keep /api/auth/me protected (will require authentication)
            
            // 2. SHOP ENDPOINTS (Split by Method)
            // Allow everyone to VIEW shops and menus
            .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/shops/**").permitAll()
            // Only ADMIN can Create/Update/Delete shops via this controller
            .requestMatchers("/api/shops/**").hasAuthority("ADMIN") 

            // 3. ROLE-SPECIFIC ENDPOINTS
            // Only ADMIN role can access /api/admin/**
            .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
            
            // Only VENDOR role can access /api/vendor/**
            .requestMatchers("/api/vendor/**").hasAuthority("VENDOR")
            
            // 4. ORDER ENDPOINTS
            // Any logged-in user (Customer/Vendor/Admin) can access orders
            .requestMatchers("/api/orders/**").authenticated()
            
            // 5. CATCH-ALL
            .anyRequest().authenticated()
        )
        .sessionManagement(sess -> sess
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

    // 2. Define the Rules: Allow localhost:5173
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow your frontend origin
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); 
        
        // Allow all standard methods (GET, POST for orders, etc.)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow all headers (Authorization tokens, Content-Type)
        configuration.setAllowedHeaders(List.of("*"));
        
        // Allow credentials (important for authenticated requests)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(
        PasswordEncoder passwordEncoder,
        UserDetailsService userDetailsService
    ) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}