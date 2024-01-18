package com.fdmgroup.BankingApplication.dto.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DifferentBankAccountValidator.class)
@Documented
public @interface DifferentBankAccounts {

    String message() default "You cannot transfer to your own bank account.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

