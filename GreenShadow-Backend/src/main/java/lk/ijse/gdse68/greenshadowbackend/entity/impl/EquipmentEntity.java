package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lk.ijse.gdse68.greenshadowbackend.enums.EquipmentType;
import lk.ijse.gdse68.greenshadowbackend.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "equipment")

public class EquipmentEntity implements SuperEntity {
    @Id
    private String equipment_id;
    private String name;
    @Enumerated(EnumType.STRING)
    private EquipmentType type;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id", nullable = false)
    private StaffEntity staff;
    @ManyToOne
    @JoinColumn(name = "field_code", nullable = false)
    private FieldEntity field;
}
