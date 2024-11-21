package lk.ijse.gdse68.greenshadowbackend.controller;

import lk.ijse.gdse68.greenshadowbackend.customObj.VehicleResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.VehicleDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.VehicleNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/vehicle")
@RequiredArgsConstructor

public class VehicleController {

    @Autowired
    private final VehicleService vehicleService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveVehicle(@RequestBody VehicleDTO vehicleDTO){
        if(vehicleDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            try {
                vehicleService.saveVehicle(vehicleDTO);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }catch (DataPersistFailedException e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }catch (Exception e){
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable("id") String vehicle_id){
        try {
            vehicleService.deleteVehicle(vehicle_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (VehicleNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public VehicleResponse getSelectedVehicle(@PathVariable("id") String vehicle_id) throws Exception {
        return vehicleService.getVehicle(vehicle_id);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<VehicleDTO> getAllVehicle() throws Exception {
        return vehicleService.getAllVehicles();
    }

    @PatchMapping(value = "/{vehicle_id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateVehicle(@PathVariable ("vehicle_id") String vehicle_id, @RequestBody VehicleDTO vehicleDTO) throws Exception {
        try {
            if(vehicleDTO == null && (vehicle_id == null || vehicleDTO.equals(""))) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            vehicleService.updateVehicle(vehicle_id,vehicleDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (VehicleNotFound e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
