package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "field")

public class FieldEntity implements SuperEntity {
    @Id
    private String field_code;
    private String field_name;
    private Point location;
    private double extent_size;
    @Column(columnDefinition = "LONGTEXT")
    private String image_1;
    @Column(columnDefinition = "LONGTEXT")
    private String image_2;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<CropEntity> crops;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<StaffFieldDetails> staff_field;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<LogsEntity> logs;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<EquipmentEntity> equipment;
}
