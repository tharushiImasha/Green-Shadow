package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;

import java.util.List;

public interface FieldService {
    String saveField(FieldDTO fieldDTO) throws Exception;
    String updateField(String field_code, FieldDTO fieldDTO) throws Exception;
    String deleteField(String field_code) throws Exception;
    List<FieldDTO> getAllField() throws Exception;
    FieldDTO getField(String field_code) throws Exception;
}
