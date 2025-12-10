package com.appdevg4.syntheque.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for SecurityUtil to verify XSS and SQL injection prevention
 */
class SecurityUtilTest {

    @Test
    void testSanitizeInput_RemovesScriptTags() {
        String maliciousInput = "<script>alert('XSS')</script>Hello";
        String sanitized = SecurityUtil.sanitizeInput(maliciousInput);
        
        assertFalse(sanitized.contains("<script>"));
        assertFalse(sanitized.contains("alert"));
    }

    @Test
    void testSanitizeInput_EncodesSpecialCharacters() {
        String input = "<div>Test</div>";
        String sanitized = SecurityUtil.sanitizeInput(input);
        
        assertTrue(sanitized.contains("&lt;") || !sanitized.contains("<"));
    }

    @Test
    void testValidateNoSqlInjection_DetectsSqlKeywords() {
        String sqlInjection = "admin' OR '1'='1";
        
        assertThrows(SecurityException.class, () -> {
            SecurityUtil.validateNoSqlInjection(sqlInjection);
        });
    }

    @Test
    void testValidateNoSqlInjection_AllowsNormalInput() {
        String normalInput = "john.doe@example.com";
        
        assertDoesNotThrow(() -> {
            SecurityUtil.validateNoSqlInjection(normalInput);
        });
    }

    @Test
    void testValidateNoXss_DetectsXssAttempts() {
        String xssAttempt = "<script>alert('xss')</script>";
        
        assertThrows(SecurityException.class, () -> {
            SecurityUtil.validateNoXss(xssAttempt);
        });
    }

    @Test
    void testValidateNoXss_AllowsNormalInput() {
        String normalInput = "Hello World";
        
        assertDoesNotThrow(() -> {
            SecurityUtil.validateNoXss(normalInput);
        });
    }

    @Test
    void testIsValidEmail_AcceptsValidEmail() {
        assertTrue(SecurityUtil.isValidEmail("user@example.com"));
        assertTrue(SecurityUtil.isValidEmail("john.doe+tag@domain.co.uk"));
    }

    @Test
    void testIsValidEmail_RejectsInvalidEmail() {
        assertFalse(SecurityUtil.isValidEmail("invalid.email"));
        assertFalse(SecurityUtil.isValidEmail("@example.com"));
        assertFalse(SecurityUtil.isValidEmail("user@"));
    }

    @Test
    void testIsValidPassword_AcceptsStrongPassword() {
        assertTrue(SecurityUtil.isValidPassword("SecureP@ss123"));
        assertTrue(SecurityUtil.isValidPassword("MyP@ssw0rd!"));
    }

    @Test
    void testIsValidPassword_RejectsWeakPassword() {
        assertFalse(SecurityUtil.isValidPassword("weak"));
        assertFalse(SecurityUtil.isValidPassword("noupppercase1!"));
        assertFalse(SecurityUtil.isValidPassword("NOLOWERCASE1!"));
        assertFalse(SecurityUtil.isValidPassword("NoNumbers!"));
        assertFalse(SecurityUtil.isValidPassword("NoSpecial123"));
    }

    @Test
    void testValidateAndSanitize_HandlesComplexInput() {
        String maliciousInput = "<script>SELECT * FROM users</script>";
        
        assertThrows(SecurityException.class, () -> {
            SecurityUtil.validateAndSanitize(maliciousInput);
        });
    }

    @Test
    void testValidateAndSanitize_AllowsCleanInput() {
        String cleanInput = "John Doe";
        
        assertDoesNotThrow(() -> {
            String result = SecurityUtil.validateAndSanitize(cleanInput);
            assertNotNull(result);
            assertEquals("John Doe", result);
        });
    }

    @Test
    void testSanitizeMultiple_HandlesMultipleInputs() {
        String[] inputs = {"Hello", "World", "Test"};
        String[] sanitized = SecurityUtil.sanitizeMultiple(inputs);
        
        assertEquals(3, sanitized.length);
        assertEquals("Hello", sanitized[0]);
        assertEquals("World", sanitized[1]);
        assertEquals("Test", sanitized[2]);
    }
}
