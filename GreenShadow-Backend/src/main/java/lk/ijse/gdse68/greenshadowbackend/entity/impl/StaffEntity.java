package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lk.ijse.gdse68.greenshadowbackend.enums.Gender;
import lk.ijse.gdse68.greenshadowbackend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "staff")

public class StaffEntity implements SuperEntity {
    @Id
    private String id;
    private String first_name;
    private String last_name;
    @Column(unique = true)
    private String email;
    private String contact_no;
    private String address_line_1;
    private String address_line_2;
    private String address_line_3;
    private String address_line_4;
    private String address_line_5;
    private String designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate dob;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate joined_date;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<VehicleEntity> vehicles;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<StaffFieldDetails> staff_field;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<LogsEntity> logs;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<EquipmentEntity> equipment;
}
