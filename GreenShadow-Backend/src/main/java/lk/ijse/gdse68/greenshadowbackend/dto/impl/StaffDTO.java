package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.StaffResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lk.ijse.gdse68.greenshadowbackend.enums.Gender;
import lk.ijse.gdse68.greenshadowbackend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class StaffDTO implements SuperDTO, StaffResponse {
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
    private Role role;
    private Gender gender;
    private LocalDate dob;
    private LocalDate joined_date;
    private List<VehicleDTO> vehicleDTOS;
    private List<FieldDTO> fieldDTOS;
    private List<LogsDTO> logsDTOS;
    private List<EquipmentDTO> equipmentDTOS;
}
