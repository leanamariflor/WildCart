package com.appdevg4.syntheque.util;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class NoSqlInjectionValidator implements ConstraintValidator<NoSqlInjection, String> {

    @Override
    public void initialize(NoSqlInjection constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return true;
        }
        
        try {
            SecurityUtil.validateNoSqlInjection(value);
            return true;
        } catch (SecurityException e) {
            return false;
        }
    }
}
