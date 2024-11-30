package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.VehicleResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;

import java.util.List;

public interface VehicleService {
    String generateNextId();
    void saveVehicle(VehicleDTO vehicleDTO) throws Exception;
    void updateVehicle(String vehicle_code, VehicleDTO vehicleDTO) throws Exception;
    void deleteVehicle(String vehicle_code) throws Exception;
    List<VehicleDTO> getAllVehicles() throws Exception;
    VehicleResponse getVehicle(String vehicle_code) throws Exception;
}
