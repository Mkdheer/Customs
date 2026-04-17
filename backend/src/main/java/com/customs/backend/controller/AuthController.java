package com.customs.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.customs.backend.service.AuthService;

@RestController
@CrossOrigin(allowCredentials = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials){
		
		String email = credentials.get("email");
		String password = credentials.get("password");
		Map<String, Object> m = authService.login(email,password);
		return ResponseEntity.ok(m);
	}

	
	
}
