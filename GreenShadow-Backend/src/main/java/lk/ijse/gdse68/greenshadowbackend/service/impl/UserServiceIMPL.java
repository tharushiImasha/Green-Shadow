package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.UserErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.UserResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.UserDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.UserDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.UserEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.UserNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.UserService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private Mapping mapping;

    @Override
    public void saveUser(UserDTO user) throws Exception {
        UserEntity userEntity = mapping.convertToUserEntity(user);
        UserEntity save = userDAO.save(userEntity);
        if (save == null) {
            throw new DataPersistFailedException("User save failed");
        }
    }

    @Override
    public void updateUser(String email, UserDTO user) throws Exception {
        Optional<UserEntity> tmpUser = userDAO.findByEmail(email);
        if (!tmpUser.isPresent()) {
            throw new UserNotFound("User not found");
        }else {
            tmpUser.get().setEmail(email);
            tmpUser.get().setPassword(user.getPassword());
        }
    }

    @Override
    public void deleteUser(String email) throws Exception {
        Optional<UserEntity> emailUser = userDAO.findByEmail(email);
        if (!emailUser.isPresent()) {
            throw new UserNotFound("User not found");
        }else {
            userDAO.delete(emailUser.get());
        }
    }

    @Override
    public List<UserDTO> getAllUsers() throws Exception {
        List<UserEntity> all = userDAO.findAll();
        return mapping.convertToUserDTOList(all);
    }

    @Override
    public UserResponse getUser(String email) throws Exception {
        if(userDAO.findByEmail(email).isPresent()){
            return mapping.convertToUserDTO(userDAO.findByEmail(email).get());
        }else {
            return new UserErrorResponse(0, "User not found");
        }
    }
}
