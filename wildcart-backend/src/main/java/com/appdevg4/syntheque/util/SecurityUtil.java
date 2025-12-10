package com.appdevg4.syntheque.util;

import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

/**
 * Security utility class for XSS prevention and input sanitization
 */
@Component
public class SecurityUtil {

    // OWASP HTML Sanitizer policy - removes all HTML tags and scripts
    private static final PolicyFactory POLICY = Sanitizers.FORMATTING.and(Sanitizers.LINKS);
    
    // SQL Injection patterns to detect
    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile(
        ".*(--|;|/\\*|\\*/|xp_|sp_|exec|execute|select|insert|update|delete|drop|create|alter|union|information_schema|script|'\\s*or\\s*'|'\\s*=\\s*').*",
        Pattern.CASE_INSENSITIVE
    );
    
    // XSS patterns to detect
    private static final Pattern XSS_PATTERN = Pattern.compile(
        ".*(<script|javascript:|onerror=|onload=|<iframe|eval\\(|expression\\(|vbscript:|<object|<embed|<link).*",
        Pattern.CASE_INSENSITIVE
    );

    /**
     * Sanitize input to prevent XSS attacks
     * Removes potentially dangerous HTML/JavaScript
     */
    public static String sanitizeInput(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        
        // Remove any HTML tags and scripts
        String sanitized = POLICY.sanitize(input);
        
        // Additional cleaning: remove special characters that could be used in XSS
        sanitized = sanitized.replace("<", "&lt;")
                             .replace(">", "&gt;")
                             .replace("\"", "&quot;")
                             .replace("'", "&#x27;")
                             .replace("/", "&#x2F;");
        
        return sanitized.trim();
    }

    /**
     * Validate input for SQL injection patterns
     * Throws exception if suspicious patterns detected
     */
    public static void validateNoSqlInjection(String input) throws SecurityException {
        if (input == null || input.trim().isEmpty()) {
            return;
        }
        
        if (SQL_INJECTION_PATTERN.matcher(input).matches()) {
            throw new SecurityException("Invalid input: potential SQL injection detected");
        }
    }

    /**
     * Validate input for XSS patterns
     * Throws exception if suspicious patterns detected
     */
    public static void validateNoXss(String input) throws SecurityException {
        if (input == null || input.trim().isEmpty()) {
            return;
        }
        
        if (XSS_PATTERN.matcher(input).matches()) {
            throw new SecurityException("Invalid input: potential XSS attack detected");
        }
    }

    /**
     * Comprehensive input validation - checks for both SQL injection and XSS
     */
    public static String validateAndSanitize(String input) throws SecurityException {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        
        // First validate
        validateNoSqlInjection(input);
        validateNoXss(input);
        
        // Then sanitize
        return sanitizeInput(input);
    }

    /**
     * Validate email format
     */
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        Pattern emailPattern = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        );
        
        return emailPattern.matcher(email).matches();
    }

    /**
     * Validate password strength
     * At least 8 characters, contains uppercase, lowercase, number, and special character
     */
    public static boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;
        
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            else if (Character.isLowerCase(c)) hasLower = true;
            else if (Character.isDigit(c)) hasDigit = true;
            else hasSpecial = true;
        }
        
        return hasUpper && hasLower && hasDigit && hasSpecial;
    }

    /**
     * Sanitize multiple fields at once
     */
    public static String[] sanitizeMultiple(String... inputs) {
        if (inputs == null) {
            return new String[0];
        }
        
        String[] sanitized = new String[inputs.length];
        for (int i = 0; i < inputs.length; i++) {
            sanitized[i] = sanitizeInput(inputs[i]);
        }
        
        return sanitized;
    }
}
