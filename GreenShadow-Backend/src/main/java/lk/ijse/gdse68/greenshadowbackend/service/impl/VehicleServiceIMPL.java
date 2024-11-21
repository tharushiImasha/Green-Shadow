package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.VehicleErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.VehicleResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.StaffDAO;
import lk.ijse.gdse68.greenshadowbackend.dao.VehicleDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.StaffEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.VehicleEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.StaffNotFound;
import lk.ijse.gdse68.greenshadowbackend.exception.VehicleNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.VehicleService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VehicleServiceIMPL implements VehicleService {

    @Autowired
    private VehicleDAO vehicleDAO;
    @Autowired
    private StaffDAO staffDAO;
    @Autowired
    private Mapping mapping;

    public String generateNextId() {
        String lastId = vehicleDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "V001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("V%03d", idNumber);
    }

    @Override
    public void saveVehicle(VehicleDTO vehicleDTO) throws Exception {
        if (vehicleDTO.getVehicle_code() == null || vehicleDTO.getVehicle_code().isEmpty()) {
            vehicleDTO.setVehicle_code(generateNextId());
        }

        StaffEntity staffEntity = staffDAO.findById(vehicleDTO.getId())
                .orElseThrow(() -> new StaffNotFound("Staff not found with ID: " + vehicleDTO.getId()));

        VehicleEntity vehicleEntity = mapping.convertToVehicleEntity(vehicleDTO);

        vehicleEntity.setStaff(staffEntity);
        VehicleEntity save = vehicleDAO.save(vehicleEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Vehicle");
        }
    }

    @Override
    public void updateVehicle(String vehicle_code, VehicleDTO vehicleDTO) throws Exception {
        Optional<VehicleEntity> tmpVehicle = vehicleDAO.findById(vehicle_code);
        if (!tmpVehicle.isPresent()) {
            throw new VehicleNotFound("Vehicle not found");
        }else {
            tmpVehicle.get().setLicense_plate_number(vehicleDTO.getLicense_plate_number());
            tmpVehicle.get().setCategory(vehicleDTO.getCategory());
            tmpVehicle.get().setFuel_type(vehicleDTO.getFuel_type());
            tmpVehicle.get().setStatus(vehicleDTO.getStatus());
            tmpVehicle.get().setRemark(vehicleDTO.getRemark());

            StaffEntity staff = staffDAO.getReferenceById(vehicleDTO.getId());
            if (staff == null) {
                throw new StaffNotFound("Staff not found");
            } else {
                tmpVehicle.get().setStaff(staff);
            }
        }
    }

    @Override
    public void deleteVehicle(String vehicle_code) throws Exception {
        Optional<VehicleEntity> byId = vehicleDAO.findById(vehicle_code);
        if (!byId.isPresent()) {
            throw new VehicleNotFound("Vehicle not found");
        }else {
            vehicleDAO.deleteById(vehicle_code);
        }
    }

    @Override
    public List<VehicleDTO> getAllVehicles() throws Exception {
        List<VehicleEntity> allVehicle = vehicleDAO.findAll();
        List<VehicleDTO> vehicleDTOS = new ArrayList<>();

        for (VehicleEntity vehicle : allVehicle) {
            VehicleDTO dto = mapping.convertToVehicleDTO(vehicle);
            dto.setId(vehicle.getStaff().getId());
            vehicleDTOS.add(dto);
        }

        return vehicleDTOS;
    }

    @Override
    public VehicleResponse getVehicle(String vehicle_code) throws Exception {
        Optional<VehicleEntity> optionalVehicle = vehicleDAO.findById(vehicle_code);
        if (optionalVehicle.isPresent()) {
            VehicleEntity vehicle = optionalVehicle.get();
            VehicleDTO dto = mapping.convertToVehicleDTO(vehicle);
            dto.setId(vehicle.getStaff().getId());
            return dto;
        } else {
            return new VehicleErrorResponse(0, "Vehicle Not Found");
        }
    }
}
