package com.unibus;
import org.springframework.web.bind.annotation.*; import java.util.*;
@RestControllerAdvice public class GlobalExceptionHandler{
@ExceptionHandler(Exception.class) public Map<String,String> handle(Exception e){return Map.of("erro",e.getMessage());}
}