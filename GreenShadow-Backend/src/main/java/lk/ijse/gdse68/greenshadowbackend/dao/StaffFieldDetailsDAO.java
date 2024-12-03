package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.embedded.StaffFieldDetailPK;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffFieldDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffFieldDetailsDAO extends JpaRepository<StaffFieldDetails, StaffFieldDetailPK> {
    @Query("SELECT s.staffFieldDetailPK.staff_id FROM StaffFieldDetails s WHERE s.staffFieldDetailPK.field_code = :fieldCode")
    List<String> findStaffIdsByFieldCode(@Param("fieldCode") String fieldCode);
}