package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.embedded.StaffFieldDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "staff_field_details")

public class StaffFieldDetails {
    @EmbeddedId
    private StaffFieldDetailPK staffFieldDetailPK;
    @ManyToOne
    @JoinColumn(name = "field_code", referencedColumnName = "field_code", insertable = false, updatable = false)
    private FieldEntity field;
    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private StaffEntity staff;
    private String assigned_date;
}
