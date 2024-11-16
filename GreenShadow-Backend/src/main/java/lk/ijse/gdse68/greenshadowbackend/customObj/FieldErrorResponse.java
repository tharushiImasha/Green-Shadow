package lk.ijse.gdse68.greenshadowbackend.customObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FieldErrorResponse implements Serializable, FieldResponse {
    private int errorCode;
    private String errorMsg;
}
