package com.example.backend.Service;

import com.example.backend.Model.UserPrincipal;
import com.example.backend.Model.Users;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AgriUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> userTemp = userRepository.findByEmail(email);
        if (userTemp.isPresent()) {
            Users user = userTemp.get();
            return new UserPrincipal(user);
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}
