package lk.ijse.gdse68.greenshadowbackend.util;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.*;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapping {
    @Autowired
    private ModelMapper modelMapper;

    //Matters of CropEntity and Dto
    public CropDTO convertToCropDTO(CropEntity crop) {
        return modelMapper.map(crop, CropDTO.class);
    }
    public CropEntity convertToCropEntity(CropDTO cropDTO) {
        return modelMapper.map(cropDTO, CropEntity.class);
    }

    public List<CropDTO> convertToCropDTOList(List<CropEntity> allCrop) {
        return modelMapper.map(allCrop, new TypeToken<List<CropDTO>>() {}.getType());
    }

    //Matters of FiledEntity and Dto
    public FieldDTO convertToFieldDTO(FieldEntity field) {
        return modelMapper.map(field, FieldDTO.class);
    }
    public FieldEntity convertToFieldEntity(FieldDTO fieldDTO) {
        return modelMapper.map(fieldDTO, FieldEntity.class);
    }

    public List<FieldDTO> convertToFieldDTOList(List<FieldEntity> allField) {
        return modelMapper.map(allField, new TypeToken<List<FieldDTO>>() {}.getType());
    }

    //Matters of VehicleEntity and Dto
    public VehicleDTO convertToVehicleDTO(VehicleEntity vehicle) {
        return modelMapper.map(vehicle, VehicleDTO.class);
    }
    public VehicleEntity convertToVehicleEntity(VehicleDTO vehicleDTO) {
        return modelMapper.map(vehicleDTO, VehicleEntity.class);
    }

    public List<VehicleDTO> convertToVehicleDTOList(List<VehicleEntity> allVehicle) {
        return modelMapper.map(allVehicle, new TypeToken<List<VehicleDTO>>() {}.getType());
    }

    //Matters of StaffEntity and Dto
    public StaffDTO convertToStaffDTO(StaffEntity staff) {
        return modelMapper.map(staff, StaffDTO.class);
    }
    public StaffEntity convertToStaffEntity(StaffDTO staffDTO) {
        return modelMapper.map(staffDTO, StaffEntity.class);
    }

    public List<StaffDTO> convertToStaffDTOList(List<StaffEntity> allStaff) {
        return modelMapper.map(allStaff, new TypeToken<List<StaffDTO>>() {}.getType());
    }

    //Matters of EquipmentEntity and Dto
    public EquipmentDTO convertToEquipmentDTO(EquipmentEntity equipment) {
        return modelMapper.map(equipment, EquipmentDTO.class);
    }
    public EquipmentEntity convertToEquipmentEntity(EquipmentDTO equipmentDTO) {
        return modelMapper.map(equipmentDTO, EquipmentEntity.class);
    }

    public List<EquipmentDTO> convertToEquipmentDTOList(List<EquipmentEntity> allEquipment) {
        return modelMapper.map(allEquipment, new TypeToken<List<EquipmentDTO>>() {}.getType());
    }

    //Matters of LogEntity and Dto
    public LogsDTO convertToLogDTO(LogsEntity logs) {
        return modelMapper.map(logs, LogsDTO.class);
    }
    public LogsEntity convertToLogEntity(LogsDTO logsDTO) {
        return modelMapper.map(logsDTO, LogsEntity.class);
    }

    public List<LogsDTO> convertToLogDTOList(List<LogsEntity> allLogs) {
        return modelMapper.map(allLogs, new TypeToken<List<LogsDTO>>() {}.getType());
    }

    //Matters of UserEntity and Dto
    public UserDTO convertToUserDTO(UserEntity user) {
        return modelMapper.map(user, UserDTO.class);
    }
    public UserEntity convertToUserEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, UserEntity.class);
    }

    public List<UserDTO> convertToUserDTOList(List<UserEntity> allUser) {
        return modelMapper.map(allUser, new TypeToken<List<UserDTO>>() {}.getType());
    }
}
