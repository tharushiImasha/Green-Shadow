package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.UserErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.UserResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.UserDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.UserDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.UserEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.UserNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.UserService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import lk.ijse.gdse68.greenshadowbackend.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserServiceIMPL implements UserDetailsService, UserService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private Mapping mapping;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public int saveUser(UserDTO user) throws Exception {
        if (userDAO.existsByEmail(user.getEmail())) {
            return VarList.Not_Acceptable;
        }else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(user.getRole());
            userDAO.save(modelMapper.map(user, UserEntity.class));
            return VarList.Created;
        }
    }

    public void updateUser(String email, UserDTO userDTO) throws UserNotFound {
        // Fetch the existing user
        UserEntity existingUser = userDAO.findByEmail(email);
        if (existingUser == null) {
            throw new UserNotFound("User not found");
        }

        // Update user details
        existingUser.setName(userDTO.getName());
        existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encode password

        // Save the updated user
        userDAO.save(existingUser);
    }


    @Override
    public void deleteUser(String email) throws Exception {
        UserEntity byEmail = userDAO.findByEmail(email);
        if (byEmail == null) {
            throw new UserNotFound("User not found");
        }else {
            userDAO.delete(byEmail);
        }
    }

    @Override
    public List<UserDTO> getAllUsers() throws Exception {
        List<UserEntity> all = userDAO.findAll();
        return mapping.convertToUserDTOList(all);
    }

    @Override
    public UserResponse getUser(String email) throws Exception {
        if(!userDAO.findByEmail(email).equals(null)) {
            return mapping.convertToUserDTO(userDAO.findByEmail(email));
        }else {
            return new UserErrorResponse(0, "User not found");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userDAO.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    public UserDTO loadUserDetailsByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userDAO.findByEmail(username);
        return modelMapper.map(user, UserDTO.class);
    }

    private Set<SimpleGrantedAuthority> getAuthority(UserEntity user){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return authorities;
    }
}
