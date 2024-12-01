package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "vehicle")

public class VehicleEntity implements SuperEntity {
    @Id
    private String vehicle_code;
    private String license_plate_number;
    private String category;
    private String fuel_type;
    private String status;
    private String remark;
    @ManyToOne
    @JoinColumn(name = "id")
    private StaffEntity staff;
}
