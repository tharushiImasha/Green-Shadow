package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.EquipmentDTO;
import lk.ijse.gdse68.greenshadowbackend.service.EquipmentService;

import java.util.List;

public class EquipmentServiceIMPL implements EquipmentService {
    @Override
    public String asveEquipment(EquipmentDTO equipmentDTO) throws Exception {
        return "";
    }

    @Override
    public void updateEquipment(String equipment_id, EquipmentDTO equipmentDTO) throws Exception {

    }

    @Override
    public void deleteEquipment(String equipment_id) throws Exception {

    }

    @Override
    public List<EquipmentDTO> getAllEquipment() throws Exception {
        return List.of();
    }

    @Override
    public EquipmentDTO getEquipment(String equipment_id) throws Exception {
        return null;
    }
}
