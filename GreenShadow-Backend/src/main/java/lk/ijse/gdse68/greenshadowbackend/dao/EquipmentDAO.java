package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.entity.impl.EquipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EquipmentDAO extends JpaRepository<EquipmentEntity, String> {
    @Query("SELECT e.equipment_id FROM EquipmentEntity e ORDER BY e.equipment_id DESC LIMIT 1")
    String findLastId();
}
