package com.fdmgroup.BankingApplication.dto.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = InitialBalanceValidator.class)
@Documented
public @interface ValidInitialBalance {
    String message() default "Initial balance must be greater than 0.01";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}