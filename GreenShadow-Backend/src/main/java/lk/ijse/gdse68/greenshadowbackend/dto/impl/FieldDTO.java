package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class FieldDTO implements SuperDTO {
    private String field_code;
    private String field_name;
    private Point location;
    private double extent_size;
    private String image_1;
    private String image_2;
    private List<CropDTO> cropDTOS;
    private List<StaffDTO> staffDTOS;
    private List<LogsDTO> logsDTOS;
    private List<EquipmentDTO> equipmentDTOS;
}
