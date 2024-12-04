package lk.ijse.gdse68.greenshadowbackend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.gdse68.greenshadowbackend.entity.SuperEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")

public class UserEntity implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uid;
    @Column(unique = true, nullable = false)
    private String email;
    private String name;
    private String password;
    private String role;
}
