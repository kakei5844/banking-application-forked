package com.fdmgroup.BankingApplication.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SpringSecurityConfig {

	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		return http
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
					.requestMatchers("api/v1/credit-cards/purchase").permitAll()
					.requestMatchers("/", "/api/v1/login", "/api/v1/logout", "/api/v1/register", "/h2/**", "/css/**", "/js/**", "/images/**")
					.permitAll()
                    .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // *
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
	}
}
