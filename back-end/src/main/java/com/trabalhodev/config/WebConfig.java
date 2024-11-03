package com.trabalhodev.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")  // Permitir apenas chamadas da porta 3000 (React)
            .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
            .allowedHeaders("*")  // Cabeçalhos permitidos
            .allowCredentials(true);  // Permitir envio de credenciais (cookies, autenticação)
    }
}
