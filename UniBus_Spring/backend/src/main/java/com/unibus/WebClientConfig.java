package com.unibus;
import org.springframework.context.annotation.*; import org.springframework.web.reactive.function.client.WebClient;
@Configuration public class WebClientConfig{
@Bean WebClient webClient(){return WebClient.builder().build();}
}