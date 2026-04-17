package com.customs.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customs.backend.repository.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	UserRepository userRepository;
	
	public Map<String, Object> login(String email, String password){
		if(userRepository.existsByEmail(email)) {
			
		}
		
		return null;
	}
}
