package com.example.backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailDTO {

    private String first_name;
    private String last_name;
    private String email;
    private String password;

}
