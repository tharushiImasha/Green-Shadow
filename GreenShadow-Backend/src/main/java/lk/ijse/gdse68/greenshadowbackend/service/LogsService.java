package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;

import java.util.List;

public interface LogsService {
    String saveLogs(LogsDTO logs) throws Exception;
    void updateLogs(String log_code, LogsDTO logs) throws Exception;
    void deleteLogs(String log_code) throws Exception;
    List<LogsDTO> getAllLogs() throws Exception;
    LogsDTO getLogs(String log_code) throws Exception;
}
