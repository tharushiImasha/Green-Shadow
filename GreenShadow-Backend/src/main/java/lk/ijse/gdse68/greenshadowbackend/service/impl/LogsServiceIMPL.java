package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;
import lk.ijse.gdse68.greenshadowbackend.service.LogsService;

import java.util.List;

public class LogsServiceIMPL implements LogsService {
    @Override
    public String saveLogs(LogsDTO logs) throws Exception {
        return "";
    }

    @Override
    public void updateLogs(String log_code, LogsDTO logs) throws Exception {

    }

    @Override
    public void deleteLogs(String log_code) throws Exception {

    }

    @Override
    public List<LogsDTO> getAllLogs() throws Exception {
        return List.of();
    }

    @Override
    public LogsDTO getLogs(String log_code) throws Exception {
        return null;
    }
}
