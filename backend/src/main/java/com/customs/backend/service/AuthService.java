package com.customs.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customs.backend.model.User;
import com.customs.backend.repository.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	UserRepository userRepository;
	
	public Map<String, Object> login(String email, String password){
		
		Map<String,Object> m = new HashMap<>();
		
		Optional<User> userData = userRepository.findByEmail(email);
		
		if(userData.isEmpty()) {
			m.put("success", false);
			m.put("message", "User not found");
			return m;
		}

		System.out.println("USER LOG1: "+userData);
		User user = userData.get();
		System.out.println("USER LOG2: "+user);
		if(!user.getPassword().equals(password)) {
			m.put("success", false);
			m.put("message", "Incorrect Passowrd");
			return m;
		}
		
		m.put("success", true);
		m.put("message", "Login Successfull");
		m.put("name", user.getName());
		m.put("password", user.getPassword());
		m.put("role", user.getRole());
		return m;
	}
	
	public Map<String , Object > register(User user){
		
		Map<String , Object > m =  new HashMap<>();
		
		if(userRepository.existsByEmail(user.getEmail())) {
			m.put("success", false);
			m.put("message","User already exists");
			return m;
		}
		
		User saveUser = userRepository.save(user);
		
		System.out.println(saveUser);
		
		m.put("success", true);
		m.put("message", "User added successfully");
		m.put("user Id", saveUser.getId());
		m.put("role", saveUser.getRole());
		return m;
		
	}
}
