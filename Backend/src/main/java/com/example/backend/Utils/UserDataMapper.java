package com.example.backend.Utils;

import com.example.backend.DTO.UserResponseDataDTO;
import com.example.backend.DTO.UserDetailDTO;
import com.example.backend.Model.Users;


public class UserDataMapper {
    public static UserResponseDataDTO mapToUserDataDTO(Users user){
        UserResponseDataDTO userResponseDataDTO = new UserResponseDataDTO();

        userResponseDataDTO.setUser_id(user.getUser_id());
        userResponseDataDTO.setFirst_name(user.getFirst_name());

        return userResponseDataDTO;
    }

    public static UserDetailDTO mapToUserDetailDTO(Users user){
        UserDetailDTO userDetailDTO = new UserDetailDTO();

        userDetailDTO.setFirst_name(user.getFirst_name());
        userDetailDTO.setLast_name(user.getLast_name());
        userDetailDTO.setEmail(user.getEmail());
        userDetailDTO.setPassword(user.getPassword());

        return userDetailDTO;
    }
}
