package com.example.backend.Service;

import com.example.backend.DTO.UserResponseDataDTO;
import com.example.backend.DTO.UserLogin;
import com.example.backend.Model.Users;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Utils.UserDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTService jwtService;

    public ResponseEntity<String> registerUser(Users user) {
        if(userRepository.existsByEmail(user.getEmail()))
            return ResponseEntity.status(401).body("The User Already Exists.");
        else{
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.status(201).body("The User Registered Successfully.");
        }
    }

    public ResponseEntity<Object> loginUser(UserLogin userLogin) {

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword()));
        if(authentication.isAuthenticated()){
            Users userTemp = userRepository.findByEmail(userLogin.getEmail()).get();
            UserResponseDataDTO userData = UserDataMapper.mapToUserDataDTO(userTemp);
            userData.setToken(jwtService.generateToken(userLogin.getEmail()));
            return ResponseEntity.status(200).body(userData);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect Password or Email.");
        }
    }


}
