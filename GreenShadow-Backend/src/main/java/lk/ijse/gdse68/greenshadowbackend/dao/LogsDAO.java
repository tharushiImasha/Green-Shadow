package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.entity.impl.LogsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LogsDAO extends JpaRepository<LogsEntity, String> {
    @Query("SELECT l.log_code FROM LogsEntity l ORDER BY l.log_code DESC LIMIT 1")
    String findLastId();
}
