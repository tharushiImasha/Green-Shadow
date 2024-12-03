package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.FieldResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffFieldDetailsDTO;

import java.util.List;

public interface StaffFieldDetailsService {
    void saveStaffField(StaffFieldDetailsDTO staffFieldDetailsDTO) throws Exception;
    void updateStaffField(StaffFieldDetailsDTO staffFieldDetailsDTO) throws Exception;
    void deleteStaffField(String field_staff_code) throws Exception;
    List<StaffFieldDetailsDTO> getAllStaffField() throws Exception;
    FieldResponse getStaffField(String field_staff_code) throws Exception;
    List<StaffFieldDetailsDTO> getStaffByFieldCode(String fieldCode) throws Exception;
}
