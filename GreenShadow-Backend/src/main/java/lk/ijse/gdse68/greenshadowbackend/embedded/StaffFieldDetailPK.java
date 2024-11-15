package lk.ijse.gdse68.greenshadowbackend.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Embeddable
public class StaffFieldDetailPK implements Serializable {
    @Column(name = "staff_id")
    private String id;

    private String field_code;
}
