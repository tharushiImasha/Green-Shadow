package lk.ijse.gdse68.greenshadowbackend.customObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserErrorResponse implements Serializable, UserResponse {
    private int errorCode;
    private String errorMsg;
}
