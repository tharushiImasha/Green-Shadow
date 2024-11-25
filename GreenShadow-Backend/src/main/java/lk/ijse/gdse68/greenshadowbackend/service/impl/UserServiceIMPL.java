package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.UserDTO;
import lk.ijse.gdse68.greenshadowbackend.service.UserService;

import java.util.List;

public class UserServiceIMPL implements UserService {
    @Override
    public void saveUser(UserDTO user) throws Exception {

    }

    @Override
    public void updateUser(String email, UserDTO user) throws Exception {

    }

    @Override
    public void deleteUser(String email) throws Exception {

    }

    @Override
    public List<UserDTO> getAllUsers() throws Exception {
        return List.of();
    }

    @Override
    public UserDTO getUser(String email) throws Exception {
        return null;
    }
}
