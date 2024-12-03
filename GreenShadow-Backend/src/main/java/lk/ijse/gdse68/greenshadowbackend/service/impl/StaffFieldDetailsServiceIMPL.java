package lk.ijse.gdse68.greenshadowbackend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse68.greenshadowbackend.customObj.FieldResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.FieldDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffFieldDetailsDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffFieldDetailsDTO;
import lk.ijse.gdse68.greenshadowbackend.embedded.StaffFieldDetailPK;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.FieldEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffFieldDetails;
import lk.ijse.gdse68.greenshadowbackend.service.StaffFieldDetailsService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StaffFieldDetailsServiceIMPL implements StaffFieldDetailsService {

    @Autowired
    private FieldDAO fieldDAO;
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private StaffFieldDetailsDAO staffFieldDetailsDAO;
    @Autowired
    private Mapping mapping;

    @Override
    public void saveStaffField(StaffFieldDetailsDTO batchDTO) throws Exception {
        if (batchDTO.getFieldCode() == null || batchDTO.getStaffId() == null || batchDTO.getStaffId().isEmpty()) {
            throw new IllegalArgumentException("Field code and staff IDs cannot be null or empty");
        }

        // Fetch the field entity
        FieldEntity field = fieldDAO.findById(batchDTO.getFieldCode())
                .orElseThrow(() -> new EntityNotFoundException("Field not found"));

        // Loop through staff IDs and save each relationship
        for (String staffId : batchDTO.getStaffId()) {
            StaffEntity staff = staffDAO.findById(staffId)
                    .orElseThrow(() -> new EntityNotFoundException("Staff not found for ID: " + staffId));

            // Create StaffFieldDetailsPK
            StaffFieldDetailPK pk = new StaffFieldDetailPK();
            pk.setField_code(batchDTO.getFieldCode());
            pk.setStaff_id(staffId);

            // Create and save StaffFieldDetails
            StaffFieldDetails staffFieldDetails = new StaffFieldDetails();
            staffFieldDetails.setStaffFieldDetailPK(pk);
            staffFieldDetails.setField(field);
            staffFieldDetails.setStaff(staff);
            staffFieldDetails.setAssigned_date(batchDTO.getAssignedDate());

            // Persist
            staffFieldDetailsDAO.save(staffFieldDetails);
        }
    }



    @Override
    public void updateStaffField(StaffFieldDetailsDTO staffFieldDetailsDTO) throws Exception {

    }

    @Override
    public void deleteStaffField(String field_staff_code) throws Exception {

    }

    @Override
    public List<StaffFieldDetailsDTO> getAllStaffField() throws Exception {
        // Fetch all StaffFieldDetails entities from the database
        List<StaffFieldDetails> staffFieldDetailsList = staffFieldDetailsDAO.findAll();

        // Map each entity to a DTO
        List<StaffFieldDetailsDTO> staffFieldDetailsDTOList = staffFieldDetailsList.stream().map(staffFieldDetails -> {
            StaffFieldDetailsDTO dto = new StaffFieldDetailsDTO();
            dto.setFieldCode(staffFieldDetails.getStaffFieldDetailPK().getField_code());
            dto.setStaffId(List.of(staffFieldDetails.getStaffFieldDetailPK().getStaff_id())); // Convert single staff ID to a list
            dto.setAssignedDate(staffFieldDetails.getAssigned_date());
            return dto;
        }).toList();

        // Return the DTO list
        return staffFieldDetailsDTOList;
    }


    @Override
    public FieldResponse getStaffField(String field_id) throws Exception {
        return null;
    }

    @Override
    public List<StaffFieldDetailsDTO> getStaffByFieldCode(String field_code) throws Exception {
        if (field_code == null || field_code.isEmpty()) {
            throw new IllegalArgumentException("Field code cannot be null or empty");
        }

        // Fetch staff IDs associated with the given field code
        List<String> staffIds = staffFieldDetailsDAO.findStaffIdsByFieldCode(field_code);

        // Check if any staff IDs were found
        if (staffIds.isEmpty()) {
            throw new EntityNotFoundException("No staff members found for field code: " + field_code);
        }

        // Map each staff ID to a StaffFieldDetailsDTO
        List<StaffFieldDetailsDTO> staffFieldDetailsDTOList = staffIds.stream().map(staffId -> {
            StaffFieldDetailsDTO dto = new StaffFieldDetailsDTO();
            dto.setFieldCode(field_code);  // Set the field code
            dto.setStaffId(List.of(staffId));  // Wrap staff ID in a list
            // You may need to fetch the assigned date if needed, adjust accordingly
            // dto.setAssignedDate(assignedDate); // Uncomment and fetch the assigned date if necessary
            return dto;
        }).toList();

        // Return the DTO list
        return staffFieldDetailsDTOList;
    }


}
