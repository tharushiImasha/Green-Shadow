package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.FieldResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;

import java.util.List;

public interface FieldService {
    String generateNextId();
    void saveField(FieldDTO fieldDTO) throws Exception;
    void updateField(FieldDTO fieldDTO) throws Exception;
    void deleteField(String field_code) throws Exception;
    List<FieldDTO> getAllField() throws Exception;
    FieldResponse getField(String field_code) throws Exception;
}
