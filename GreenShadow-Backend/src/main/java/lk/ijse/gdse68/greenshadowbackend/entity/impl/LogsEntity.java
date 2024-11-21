package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "logs")

public class LogsEntity implements SuperEntity {
    @Id
    private String log_code;
    private Date log_date;
    private String log_details;
    @Column(columnDefinition = "LONGTEXT")
    private String observed_image;
    @ManyToOne
    @JoinColumn(name = "field_code", nullable = false)
    private FieldEntity field;
    @ManyToOne
    @JoinColumn(name = "crop_code", nullable = false)
    private CropEntity crop;
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private StaffEntity staff;
}
