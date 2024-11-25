package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.UserResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO user) throws Exception;
    void updateUser(String email, UserDTO user) throws Exception;
    void deleteUser(String email) throws Exception;
    List<UserDTO> getAllUsers() throws Exception;
    UserResponse getUser(String email) throws Exception;
}
