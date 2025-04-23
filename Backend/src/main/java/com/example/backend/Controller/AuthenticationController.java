package com.example.backend.Controller;

import com.example.backend.DTO.UserLogin;
import com.example.backend.Model.Users;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users users){
        return userService.registerUser(users);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody UserLogin userLogin){
        return userService.loginUser(userLogin);
    }
}
