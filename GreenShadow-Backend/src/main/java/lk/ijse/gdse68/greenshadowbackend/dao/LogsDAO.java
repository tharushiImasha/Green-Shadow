package lk.ijse.gdse68.greenshadowbackend.dao;

import lk.ijse.gdse68.greenshadowbackend.entity.impl.LogsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogsDAO extends JpaRepository<LogsEntity, String> {
}
