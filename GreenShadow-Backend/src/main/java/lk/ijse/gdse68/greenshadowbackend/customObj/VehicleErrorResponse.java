package lk.ijse.gdse68.greenshadowbackend.customObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleErrorResponse implements Serializable, VehicleResponse {
    private int errorCode;
    private String errorMsg;
}
