package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;
import lk.ijse.gdse68.greenshadowbackend.service.VehicleService;

import java.util.List;

public class VehicleServiceIMPL implements VehicleService {
    @Override
    public String saveVehicle(VehicleDTO vehicleDTO) throws Exception {
        return "";
    }

    @Override
    public void updateVehicle(String vehicle_code, VehicleDTO vehicleDTO) throws Exception {

    }

    @Override
    public void deleteVehicle(String vehicle_code) throws Exception {

    }

    @Override
    public List<VehicleDTO> getAllVehicles() throws Exception {
        return List.of();
    }

    @Override
    public VehicleDTO getVehicle(String vehicle_code) throws Exception {
        return null;
    }
}
