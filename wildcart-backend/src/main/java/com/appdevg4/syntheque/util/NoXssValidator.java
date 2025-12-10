package com.appdevg4.syntheque.util;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Custom validator to prevent XSS in input fields
 */
public class NoXssValidator implements ConstraintValidator<NoXss, String> {

    @Override
    public void initialize(NoXss constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return true;
        }
        
        try {
            SecurityUtil.validateNoXss(value);
            return true;
        } catch (SecurityException e) {
            return false;
        }
    }
}
