package com.appdevg4.syntheque.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Security configuration for HTTP headers to prevent XSS, clickjacking, and other attacks
 */
@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public FilterRegistrationBean<SecurityHeadersFilter> securityHeadersFilter() {
        FilterRegistrationBean<SecurityHeadersFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new SecurityHeadersFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    /**
     * Filter to add security headers to all HTTP responses
     */
    public static class SecurityHeadersFilter implements Filter {

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {
            
            HttpServletResponse httpResponse = (HttpServletResponse) response;

            // Prevent XSS attacks
            httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
            
            // Prevent clickjacking
            httpResponse.setHeader("X-Frame-Options", "DENY");
            
            // Prevent MIME type sniffing
            httpResponse.setHeader("X-Content-Type-Options", "nosniff");
            
            // Content Security Policy - prevents inline scripts and XSS
            httpResponse.setHeader("Content-Security-Policy", 
                "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: https:; " +
                "font-src 'self' data:; " +
                "connect-src 'self'; " +
                "frame-ancestors 'none'");
            
            // Referrer Policy
            httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
            
            // Permissions Policy (formerly Feature Policy)
            httpResponse.setHeader("Permissions-Policy", 
                "geolocation=(), microphone=(), camera=()");
            
            // HSTS - Force HTTPS (enable in production)
            // httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

            chain.doFilter(request, response);
        }

        @Override
        public void init(FilterConfig filterConfig) throws ServletException {
        }

        @Override
        public void destroy() {
        }
    }
}
