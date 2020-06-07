package com.toctoc.controller;

import com.toctoc.models.User;
import com.toctoc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        userService.register(user.getName(), user.getEmail(), user.getPassword());
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/see-all-users")
    public List<User> seeAllRegisteredUsers(){
        return userService.getAll();
    }
}
