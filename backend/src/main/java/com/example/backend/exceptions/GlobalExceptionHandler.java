package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNotFoundException(NotFoundException exception) {
        return ErrorMessage.builder()
                .errorCode(HttpStatus.NOT_FOUND.value())
                .errorMessage(exception.getMessage())
                .build();
    }

    @ExceptionHandler(DuplicateItemException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleTodoOrthographicException(DuplicateItemException e) {
        return ErrorMessage.builder()
                .errorCode(HttpStatus.CONFLICT.value())
                .errorMessage(e.getMessage())
                .build();
    }

}
