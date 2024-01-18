package com.fdmgroup.BankingApplication.exception;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fdmgroup.BankingApplication.BankingApplication;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	private final Logger LOGGER = LogManager.getLogger(BankingApplication.class);

	@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<String> errorMessages = result.getFieldErrors().stream()
                                          .map(FieldError::getDefaultMessage)
                                          .collect(Collectors.toList());
        
        LOGGER.error("GlobalExceptionHandler: Validation error with Response Status: {}", HttpStatus.BAD_REQUEST);
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Validation error", errorMessages);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({BankAccountNotFoundException.class, CreditCardNotFoundException.class, UserNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFoundException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage(), Collections.emptyList());
        LOGGER.error("GlobalExceptionHandler: Resource Not Found with Response Status: {}, Error Message: {}", HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({InvalidAmountException.class, InsufficientBalanceException.class, InsufficientCreditException.class})
    public ResponseEntity<ErrorResponse> handleBusinessExceptions(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), Collections.emptyList());
        LOGGER.error("GlobalExceptionHandler: Business exception with Response Status: {}, Error Message: {}", HttpStatus.BAD_REQUEST, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(RuntimeException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), Collections.emptyList());
        LOGGER.error("GlobalExceptionHandler: Access Denied exception with Response Status: {}, Error Message: {}", HttpStatus.UNAUTHORIZED, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An internal server error occurred.", Collections.emptyList());
        LOGGER.error("GlobalExceptionHandler: General exception with Response Status: {}", HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
    public static class ErrorResponse {
        private int status;
        private String message;
        private List<String> errors;

        public ErrorResponse(int status, String message, List<String> errors) {
            this.status = status; 
            this.message = message;
            this.errors = errors;
        }

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> errors) {
            this.errors = errors;
        }
        
    }

}
