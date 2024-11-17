package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.VehicleResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class VehicleDTO implements SuperDTO, VehicleResponse {
    private String vehicle_code;
    private String license_plate_number;
    private String category;
    private String fuel_type;
    private String status;
    private String remark;
    private String id;
}
