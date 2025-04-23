package com.example.backend.Controller;

import com.example.backend.Model.Users;
import com.example.backend.Service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/user")
@Controller
public class UserDetailController {

    @Autowired
    UserDetailService userDetailService;

    @PostMapping("/detail")
    public ResponseEntity<Object> getUserDetail(@RequestBody Map<String,Long> id){
        return userDetailService.fetchUserDetail(id.get("user_id"));
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateUserDetail(@RequestBody Users user){
        return userDetailService.updateUserDetail(user);
    }
}
