package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.StaffErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.StaffResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.StaffNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.StaffService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StaffServiceIMPL implements StaffService {
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private Mapping mapping;

    public String generateNextId() {
        String lastId = staffDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "S001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("S%03d", idNumber);
    }

    @Override
    public void saveStaff(StaffDTO staffDTO) throws Exception {
        if (staffDTO.getId() == null || staffDTO.getId().isEmpty()) {
            staffDTO.setId(generateNextId());
        }
        StaffEntity staffEntity = mapping.convertToStaffEntity(staffDTO);
        StaffEntity save = staffDAO.save(staffEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Staff Member");
        }
    }

    @Override
    public void updateStaff(String staff_id, StaffDTO staffDTO) throws Exception {
        Optional<StaffEntity> tmpStaff = staffDAO.findById(staff_id);
        if (!tmpStaff.isPresent()) {
            throw new StaffNotFound("Staff not found");
        }else {
            tmpStaff.get().setFirst_name(staffDTO.getFirst_name());
            tmpStaff.get().setLast_name(staffDTO.getLast_name());
            tmpStaff.get().setEmail(staffDTO.getEmail());
            tmpStaff.get().setContact_no(staffDTO.getContact_no());
            tmpStaff.get().setAddress_line_1(staffDTO.getAddress_line_1());
            tmpStaff.get().setAddress_line_2(staffDTO.getAddress_line_2());
            tmpStaff.get().setAddress_line_3(staffDTO.getAddress_line_3());
            tmpStaff.get().setAddress_line_4(staffDTO.getAddress_line_4());
            tmpStaff.get().setAddress_line_5(staffDTO.getAddress_line_5());
            tmpStaff.get().setDesignation(staffDTO.getDesignation());
            tmpStaff.get().setRole(staffDTO.getRole());
            tmpStaff.get().setGender(staffDTO.getGender());
            tmpStaff.get().setDob(staffDTO.getDob());
            tmpStaff.get().setJoined_date(staffDTO.getJoined_date());
        }
    }

    @Override
    public void deleteStaff(String id) throws Exception {
        Optional<StaffEntity> byId = staffDAO.findById(id);
        if (!byId.isPresent()) {
            throw new StaffNotFound("Staff not found");
        }else {
            staffDAO.deleteById(id);
        }
    }

    @Override
    public List<StaffDTO> getAllStaff() throws Exception {
        List<StaffEntity> allStaff = staffDAO.findAll();
        return mapping.convertToStaffDTOList(allStaff);
    }

    @Override
    public StaffResponse getStaffById(String id) throws Exception {
        if(staffDAO.existsById(id)) {
            return mapping.convertToStaffDTO(staffDAO.getReferenceById(id));
        }else {
            return new StaffErrorResponse(0, "Staff Not Found") {
            };
        }
    }
}
