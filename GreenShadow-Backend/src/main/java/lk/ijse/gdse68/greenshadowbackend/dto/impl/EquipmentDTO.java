package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.EquipmentResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lk.ijse.gdse68.greenshadowbackend.enums.EquipmentType;
import lk.ijse.gdse68.greenshadowbackend.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class EquipmentDTO implements SuperDTO, EquipmentResponse {
    private String equipment_id;
    private String name;
    private EquipmentType type;
    private Status status;
    private String staff_id;
    private String field_code;
}
