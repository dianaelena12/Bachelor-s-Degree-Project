package com.toctoc.service;

import com.toctoc.models.User;
import com.toctoc.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findAll().stream().filter(user -> user.getEmail().equals(email)).findFirst().orElse(null);
    }

    public User register(String name, String email, String password) {
        return userRepository.insert(new User(name, email, bCryptPasswordEncoder.encode(password)));
    }
}
