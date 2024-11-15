package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;

import java.util.List;

public interface EquipmentService {
    String asveEquipment(EquipmentDTO equipmentDTO) throws Exception;
    void updateEquipment(String equipment_id, EquipmentDTO equipmentDTO) throws Exception;
    void deleteEquipment(String equipment_id) throws Exception;
    List<EquipmentDTO> getAllEquipment() throws Exception;
    EquipmentDTO getEquipment(String equipment_id) throws Exception;
}
