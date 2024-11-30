package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.StaffResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffDTO;

import java.util.List;

public interface StaffService {
    String generateNextId();
    void saveStaff(StaffDTO staffDTO) throws Exception;
    void updateStaff(String id, StaffDTO staffDTO) throws Exception;
    void deleteStaff(String id) throws Exception;
    List<StaffDTO> getAllStaff() throws Exception;
    StaffResponse getStaffById(String id) throws Exception;
}
