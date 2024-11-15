package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "crop")

public class CropEntity implements SuperEntity {
    @Id
    private String crop_code;
    private String common_name;
    private String specific_name;
    @Column(columnDefinition = "LONGTEXT")
    private String crop_image;
    private String category;
    private String crop_season;
    @ManyToOne
    @JoinColumn(name = "field_code", nullable = false)
    private FieldEntity field;
    @OneToMany(mappedBy = "crop" , cascade = CascadeType.ALL)
    private List<LogsEntity> logs;
}
