package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.EquipmentErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.EquipmentResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.EquipmentDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.FieldDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.EquipmentEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.FieldEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.EquipmentNotFound;
import lk.ijse.gdse68.greenshadowbackend.exception.FieldNotFound;
import lk.ijse.gdse68.greenshadowbackend.exception.StaffNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.EquipmentService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EquipmentServiceIMPL implements EquipmentService {

    @Autowired
    private EquipmentDAO equipmentDAO;
    @Autowired
    private Mapping mapping;
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private FieldDAO fieldDAO;

    public String generateNextId() {
        String lastId = equipmentDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "E001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("E%03d", idNumber);
    }

    @Override
    public void saveEquipment(EquipmentDTO equipmentDTO) throws Exception {
        if (equipmentDTO.getEquipment_id() == null || equipmentDTO.getEquipment_id().isEmpty()) {
            equipmentDTO.setEquipment_id(generateNextId());
        }

        StaffEntity staffEntity = staffDAO.findById(equipmentDTO.getStaff_id())
                .orElseThrow(() -> new StaffNotFound("Staff not found with ID: " + equipmentDTO.getStaff_id()));

        FieldEntity fieldEntity = fieldDAO.findById(equipmentDTO.getField_code())
                .orElseThrow(() -> new FieldNotFound("Field not found with code: " + equipmentDTO.getField_code()));

        EquipmentEntity equipmentEntity = mapping.convertToEquipmentEntity(equipmentDTO);

        equipmentEntity.setStaff(staffEntity);
        equipmentEntity.setField(fieldEntity);

        EquipmentEntity savedEquipment = equipmentDAO.save(equipmentEntity);
        if (savedEquipment == null) {
            throw new DataPersistFailedException("Cannot Save Equipment");
        }
    }

    @Override
    public void updateEquipment(String equipment_id, EquipmentDTO equipmentDTO) throws Exception {
        Optional<EquipmentEntity> tmpEquipment = equipmentDAO.findById(equipment_id);
        if (!tmpEquipment.isPresent()) {
            throw new EquipmentNotFound("Equipment not found");
        }else {
            tmpEquipment.get().setName(equipmentDTO.getName());
            tmpEquipment.get().setType(equipmentDTO.getType());
            tmpEquipment.get().setStatus(equipmentDTO.getStatus());

            StaffEntity staff = staffDAO.getReferenceById(equipmentDTO.getStaff_id());
            if (staff == null) {
                throw new StaffNotFound("Staff not found");
            }else {
                tmpEquipment.get().setStaff(staff);
            }

            FieldEntity field = fieldDAO.getReferenceById(equipmentDTO.getField_code());
            if (field == null) {
                throw new FieldNotFound("Field not found");
            }else {
                tmpEquipment.get().setField(field);
            }
        }
    }

    @Override
    public void deleteEquipment(String equipment_id) throws Exception {
        Optional<EquipmentEntity> byId = equipmentDAO.findById(equipment_id);
        if (!byId.isPresent()) {
            throw new EquipmentNotFound("Equipment not found");
        }else {
            equipmentDAO.deleteById(equipment_id);
        }
    }

    @Override
    public List<EquipmentDTO> getAllEquipment() throws Exception {
        List<EquipmentEntity> allEquipment = equipmentDAO.findAll();
        List<EquipmentDTO> equipmentDTOList = new ArrayList<>();

        for (EquipmentEntity equipment : allEquipment) {
            EquipmentDTO dto = mapping.convertToEquipmentDTO(equipment);
            dto.setStaff_id(equipment.getStaff().getId());
            equipmentDTOList.add(dto);
        }

        return equipmentDTOList;
    }

    @Override
    public EquipmentResponse getEquipment(String equipment_id) throws Exception {
        Optional<EquipmentEntity> equipmentOptional = equipmentDAO.findById(equipment_id);
        if (equipmentOptional.isPresent()) {
            EquipmentEntity equipment = equipmentOptional.get();
            EquipmentDTO dto = mapping.convertToEquipmentDTO(equipment);
            dto.setStaff_id(equipment.getStaff().getId());
            return dto;
        } else {
            return new EquipmentErrorResponse(0, "Equipment Not Found");
        }
    }

}
