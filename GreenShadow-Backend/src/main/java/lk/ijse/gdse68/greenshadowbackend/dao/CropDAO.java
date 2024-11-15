package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.entity.impl.CropEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CropDAO extends JpaRepository<CropEntity, String> {
    @Query("SELECT c.crop_code FROM CropEntity c ORDER BY c.crop_code DESC LIMIT 1")
    String findLastCropId();
}
