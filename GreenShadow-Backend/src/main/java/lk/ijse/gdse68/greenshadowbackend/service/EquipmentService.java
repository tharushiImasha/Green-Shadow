package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.EquipmentResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;

import java.util.List;

public interface EquipmentService {
    void saveEquipment(EquipmentDTO equipmentDTO) throws Exception;
    void updateEquipment(String id, EquipmentDTO equipmentDTO) throws Exception;
    void deleteEquipment(String equipment_id) throws Exception;
    List<EquipmentDTO> getAllEquipment() throws Exception;
    EquipmentResponse getEquipment(String equipment_id) throws Exception;
}
