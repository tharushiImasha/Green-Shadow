package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.UserResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO implements SuperDTO, UserResponse {
    private String email;
    private String name;
    private String password;
    private String role;
}
