package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.entity.impl.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleDAO extends JpaRepository<VehicleEntity, String> {
    @Query("SELECT v.vehicle_code FROM VehicleEntity v ORDER BY v.vehicle_code DESC LIMIT 1")
    String findLastId();
}
