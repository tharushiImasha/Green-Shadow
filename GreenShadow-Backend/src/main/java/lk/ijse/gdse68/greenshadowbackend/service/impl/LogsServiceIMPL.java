package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.LogErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.LogResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.CropDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.FieldDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.LogsDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.*;
import lk.ijse.gdse68.greenshadowbackend.exception.*;
import lk.ijse.gdse68.greenshadowbackend.service.LogsService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LogsServiceIMPL implements LogsService {
    @Autowired
    private LogsDAO logsDAO;
    @Autowired
    private Mapping mapping;
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private FieldDAO fieldDAO;
    @Autowired
    private CropDAO cropDAO;

    public String generateNextId() {
        String lastId = logsDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "L001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("L%03d", idNumber);
    }

    @Override
    public void saveLogs(LogsDTO logsDTO) throws Exception {
        if (logsDTO.getLog_code() == null || logsDTO.getLog_code().isEmpty()) {
            logsDTO.setLog_code(generateNextId());
        }

        System.out.println(logsDTO);

        StaffEntity staffEntity = staffDAO.findById(logsDTO.getId())
                .orElseThrow(() -> new StaffNotFound("Staff not found with ID: " + logsDTO.getId()));
        CropEntity cropEntity = cropDAO.findById(logsDTO.getCrop_code())
                .orElseThrow(() -> new CropNotFound("Crop not found with ID: " + logsDTO.getCrop_code()));
        FieldEntity fieldEntity = fieldDAO.findById(logsDTO.getField_code())
                .orElseThrow(() -> new FieldNotFound("Field not found with code: " + logsDTO.getField_code()));

        LogsEntity logsEntity = mapping.convertToLogEntity(logsDTO);

        logsEntity.setStaff(staffEntity);
        logsEntity.setCrop(cropEntity);
        logsEntity.setField(fieldEntity);

        LogsEntity save = logsDAO.save(logsEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Log");
        }
    }

    @Override
    public void updateLogs(String log_code, LogsDTO logs) throws Exception {
        Optional<LogsEntity> tmpLog = logsDAO.findById(log_code);
        if (!tmpLog.isPresent()) {
            throw new LogNotFound("Log not found");
        }else {
            tmpLog.get().setLog_date(logs.getLog_date());
            tmpLog.get().setLog_details(logs.getLog_details());
            tmpLog.get().setObserved_image(logs.getObserved_image());

            StaffEntity staff = staffDAO.getReferenceById(logs.getId());
            if (staff == null) {
                throw new StaffNotFound("Staff not found");
            }else {
                tmpLog.get().setStaff(staff);
            }

            FieldEntity field = fieldDAO.getReferenceById(logs.getField_code());
            if (field == null) {
                throw new FieldNotFound("Field not found");
            }else {
                tmpLog.get().setField(field);
            }

            CropEntity crop = cropDAO.getReferenceById(logs.getCrop_code());
            if (crop == null) {
                throw new FieldNotFound("Crop not found");
            }else {
                tmpLog.get().setCrop(crop);
            }
        }
    }

    @Override
    public void deleteLogs(String log_code) throws Exception {
        Optional<LogsEntity> byId = logsDAO.findById(log_code);
        if (!byId.isPresent()) {
            throw new LogNotFound("Log not found");
        }else {
            logsDAO.deleteById(log_code);
        }
    }

    @Override
    public List<LogsDTO> getAllLogs() throws Exception {
        List<LogsEntity> allLogs = logsDAO.findAll();
        List<LogsDTO> logsDTOList = new ArrayList<>();

        for (LogsEntity logs : allLogs) {
            LogsDTO dto = mapping.convertToLogDTO(logs);
            dto.setId(logs.getStaff().getId());
            logsDTOList.add(dto);
        }

        return logsDTOList;
    }

    @Override
    public LogResponse getLogs(String log_code) throws Exception {
        Optional<LogsEntity> logsOptional = logsDAO.findById(log_code);
        if (logsOptional.isPresent()) {
            LogsEntity logsEntity = logsOptional.get();
            LogsDTO dto = mapping.convertToLogDTO(logsEntity);
            dto.setId(logsEntity.getStaff().getId());
            return dto;
        } else {
            return new LogErrorResponse(0, "Log Not Found");
        }
    }
}
