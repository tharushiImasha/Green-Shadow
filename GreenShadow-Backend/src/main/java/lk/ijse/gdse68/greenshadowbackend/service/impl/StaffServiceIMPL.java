package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffDTO;
import lk.ijse.gdse68.greenshadowbackend.service.StaffService;

import java.util.List;

public class StaffServiceIMPL implements StaffService {
    @Override
    public String saveStaff(StaffDTO staffDTO) throws Exception {
        return "";
    }

    @Override
    public void updateStaff(String id, StaffDTO staffDTO) throws Exception {

    }

    @Override
    public void deleteStaff(String id) throws Exception {

    }

    @Override
    public List<StaffDTO> getAllStaff() throws Exception {
        return List.of();
    }

    @Override
    public StaffDTO getStaffById(String id) throws Exception {
        return null;
    }
}
