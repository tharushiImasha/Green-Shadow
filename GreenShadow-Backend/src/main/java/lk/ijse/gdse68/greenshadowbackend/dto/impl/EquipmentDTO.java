package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.EquipmentResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class EquipmentDTO implements SuperDTO, EquipmentResponse {
    private String equipment_id;
    private String name;
    private String type;
    private String status;
    private String staff_id;
    private String field_code;
}
