package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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
    private String role;
    private String gender;
    private Date dob;
    private Date joined_date;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<VehicleEntity> vehicles;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<StaffFieldDetails> staff_field;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<LogsEntity> logs;
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<EquipmentEntity> equipment;
}
