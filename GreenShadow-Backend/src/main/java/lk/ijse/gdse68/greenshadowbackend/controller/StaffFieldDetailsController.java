package lk.ijse.gdse68.greenshadowbackend.controller;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.StaffFieldDetailsDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.service.StaffFieldDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/staff_field")
@RequiredArgsConstructor
@CrossOrigin
public class StaffFieldDetailsController {

    @Autowired
    private final StaffFieldDetailsService staffFieldDetailsService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveStaffFieldBatch(@RequestBody StaffFieldDetailsDTO batchDTO) {
        if (batchDTO == null || batchDTO.getStaffId().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            staffFieldDetailsService.saveStaffField(batchDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle entity not found
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle unexpected errors
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StaffFieldDetailsDTO>> getAllStaffFieldDetails() {
        try {
            // Fetch all staff-field details
            List<StaffFieldDetailsDTO> staffFieldDetails = staffFieldDetailsService.getAllStaffField();

            // Check if the list is empty
            if (staffFieldDetails.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 if no data is found
            }

            // Return the list with HTTP status 200 (OK)
            return new ResponseEntity<>(staffFieldDetails, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle unexpected errors
        }
    }

    @GetMapping("/staff-field/{fieldCode}")
    public ResponseEntity<List<StaffFieldDetailsDTO>> getStaffByFieldCode(@PathVariable String fieldCode) {
        try {
            List<StaffFieldDetailsDTO> staffFieldDetails = staffFieldDetailsService.getStaffByFieldCode(fieldCode);
            return new ResponseEntity<>(staffFieldDetails, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle entity not found
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Handle unexpected errors
        }
    }


}
