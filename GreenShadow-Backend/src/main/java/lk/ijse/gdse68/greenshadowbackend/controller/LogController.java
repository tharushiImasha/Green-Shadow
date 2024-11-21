package lk.ijse.gdse68.greenshadowbackend.controller;

import lk.ijse.gdse68.greenshadowbackend.customObj.LogResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.LogsDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.LogNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.LogsService;
import lk.ijse.gdse68.greenshadowbackend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/v1/log")
@RequiredArgsConstructor
public class LogController {
    @Autowired
    private final LogsService logsService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> saveLog(
            @RequestPart("log_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date log_date,
            @RequestPart("log_details") String log_details,
            @RequestPart("observed_image") MultipartFile observed_image,
            @RequestPart("field_code") String field_code,
            @RequestPart("crop_code") String crop_code,
            @RequestPart("id") String id
    ){
        try {
            byte[] imageByteCollection1 = observed_image.getBytes();
            String base64Image = AppUtil.toBase64image(imageByteCollection1);

            LogsDTO buildLogDTO = new LogsDTO();
            buildLogDTO.setLog_date(log_date);
            buildLogDTO.setLog_details(log_details);
            buildLogDTO.setObserved_image(base64Image);
            buildLogDTO.setField_code(field_code);
            buildLogDTO.setCrop_code(crop_code);
            buildLogDTO.setId(id);

            logsService.saveLogs(buildLogDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (DataPersistFailedException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable("id") String log_code){
        try {
            logsService.deleteLogs(log_code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (LogNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public LogResponse getSelectedLog(@PathVariable("id") String log_code) throws Exception {
        return logsService.getLogs(log_code);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<LogsDTO> getAllLogs() throws Exception {
        return logsService.getAllLogs();
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateLog(@PathVariable("id") String log_id,
                                          @RequestPart("log_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date log_date,
                                          @RequestPart("log_details") String log_details,
                                          @RequestPart("observed_image") MultipartFile observed_image,
                                          @RequestPart("field_code") String field_code,
                                          @RequestPart("crop_code") String crop_code,
                                          @RequestPart("id") String id
    ){

        try {
            byte[] imageByteCollection = observed_image.getBytes();
            String updateBase64ProfilePic = AppUtil.toBase64image(imageByteCollection);

            LogsDTO updateLogDTO = new LogsDTO();
            updateLogDTO.setLog_code(log_id);
            updateLogDTO.setLog_date(log_date);
            updateLogDTO.setLog_details(log_details);
            updateLogDTO.setObserved_image(updateBase64ProfilePic);
            updateLogDTO.setField_code(field_code);
            updateLogDTO.setCrop_code(crop_code);
            updateLogDTO.setId(id);

            logsService.updateLogs(log_id, updateLogDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (LogNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
