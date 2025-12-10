package com.appdevg4.syntheque.util;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

/**
 * Annotation to mark fields that should be validated against XSS attacks
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NoXssValidator.class)
@Documented
public @interface NoXss {
    String message() default "Invalid input: potential XSS attack detected";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
