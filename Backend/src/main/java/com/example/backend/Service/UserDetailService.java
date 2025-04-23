package com.example.backend.Service;

import com.example.backend.DTO.UserDetailDTO;
import com.example.backend.Model.Users;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Utils.UserDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailService {

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<Object> fetchUserDetail(Long id) {
        Optional<Users> user = userRepository.findById(Math.toIntExact(id));
        if(user.isPresent()) {
            UserDetailDTO userDetail = UserDataMapper.mapToUserDetailDTO(user.get());
            return ResponseEntity.ok(userDetail);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    public ResponseEntity<Object> updateUserDetail(Users user) {
        Optional<Users> userTemp = userRepository.findById(Math.toIntExact(user.getUser_id()));
        if(userTemp.isPresent()) {
            userRepository.save(user);
            return ResponseEntity.ok("User details updated successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
