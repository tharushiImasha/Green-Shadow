package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class StaffDTO implements SuperDTO {
    private String id;
    private String first_name;
    private String last_name;
    private String email;
    private String contact_no;
    private String address_line_1;
    private String address_line_2;
    private String address_line_3;
    private String address_line_4;
    private String address_line_5;
    private String designation;
    private String role;
    private String gender;
    private Date dob;
    private Date joined_date;
    private List<VehicleDTO> vehicleDTOS;
    private List<FieldDTO> fieldDTOS;
    private List<LogsDTO> logsDTOS;
    private List<EquipmentDTO> equipmentDTOS;
}
