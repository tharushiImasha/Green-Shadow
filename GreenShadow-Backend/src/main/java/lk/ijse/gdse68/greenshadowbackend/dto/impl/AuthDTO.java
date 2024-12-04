package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class AuthDTO {
    private String email;
    private String token;
    private String refreshToken;
}

