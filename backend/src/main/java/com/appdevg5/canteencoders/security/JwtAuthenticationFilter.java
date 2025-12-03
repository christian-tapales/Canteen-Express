package com.appdevg5.canteencoders.security;

import com.appdevg5.canteencoders.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter for processing JWT tokens in requests.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // If there is no Authorization header or it doesn't start with Bearer, continue.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.debug("No Authorization header found for request: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        logger.debug("Processing JWT token for endpoint: {}", request.getRequestURI());

        try {
            // Extract username; JWT parsing can throw exceptions for malformed/expired tokens
            userEmail = jwtService.extractUsername(jwt);
            logger.debug("Extracted email from JWT: {}", userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Successfully authenticated user: {} for endpoint: {}", userEmail, request.getRequestURI());
                } else {
                    logger.warn("JWT token validation failed for user: {}", userEmail);
                }
            }
        } catch (Exception ex) {
            // If token parsing/validation fails (expired, malformed, etc.), do NOT block requests.
            // This allows endpoints that are permitted (e.g. /api/auth/register) to work even
            // when an invalid Authorization header is present.
            logger.error("JWT token processing failed: {}", ex.getMessage(), ex);
        }

        filterChain.doFilter(request, response);
    }
}
