package lk.ijse.gdse68.greenshadowbackend.controller;

import lk.ijse.gdse68.greenshadowbackend.customObj.FieldResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.FieldNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.FieldService;
import lk.ijse.gdse68.greenshadowbackend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/field")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class FieldController {

    @Autowired
    private final FieldService fieldService;

    @GetMapping("/next-id")
    public ResponseEntity<String> getNextCropId() {
        String nextId = fieldService.generateNextId();
        return ResponseEntity.ok(nextId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> saveField(
            @RequestPart("field_name") String field_name,
            @RequestPart("location") String location,
            @RequestPart("extent_size") String extent_size,
            @RequestPart("image_1") MultipartFile image_1,
            @RequestPart("image_2") MultipartFile image_2
    ){
        try {
            // Convert "location" string to Point object manually if necessary
            String[] coordinates = location.split(",");
            Point point = new Point(Integer.parseInt(coordinates[0].trim()), Integer.parseInt(coordinates[1].trim()));

            byte[] imageByteCollection1 = image_1.getBytes();
            String base64Image_1 = AppUtil.toBase64image(imageByteCollection1);

            byte[] imageByteCollection2 = image_2.getBytes();
            String base64Image_2 = AppUtil.toBase64image(imageByteCollection2);

            //Build the user object
            FieldDTO buildFieldDTO = new FieldDTO();
            buildFieldDTO.setField_code(buildFieldDTO.getField_code());
            buildFieldDTO.setField_name(field_name);
            buildFieldDTO.setLocation(point);
            buildFieldDTO.setExtent_size(Double.parseDouble(extent_size));
            buildFieldDTO.setImage_1(base64Image_1);
            buildFieldDTO.setImage_2(base64Image_2);

            //Send to the Service layer
            fieldService.saveField(buildFieldDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (DataPersistFailedException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteField(@PathVariable("id") String field_id){
        try {
            fieldService.deleteField(field_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (FieldNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public FieldResponse getSelectedField(@PathVariable("id") String field_code) throws Exception {
        return fieldService.getField(field_code);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FieldDTO> getAllFields() throws Exception {
        return fieldService.getAllField();
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateField(@PathVariable("id") String id,
                                           @RequestPart("field_name") String field_name,
                                           @RequestPart("location") String location,
                                           @RequestPart("extent_size") String extent_size,
                                           @RequestPart("image_1") MultipartFile image_1,
                                           @RequestPart("image_2") MultipartFile image_2
    ){

        try {
            String[] updateCoordinates = location.split(",");
            Point point = new Point(Integer.parseInt(updateCoordinates[0].trim()), Integer.parseInt(updateCoordinates[1].trim()));

            byte[] imageByteCollection1 = image_1.getBytes();
            String updateBase64ProfilePic1 = AppUtil.toBase64image(imageByteCollection1);

            byte[] imageByteCollection2 = image_2.getBytes();
            String updateBase64ProfilePic2 = AppUtil.toBase64image(imageByteCollection2);

            FieldDTO updateFieldDTO = new FieldDTO();
            updateFieldDTO.setField_code(id);
            updateFieldDTO.setField_name(field_name);
            updateFieldDTO.setLocation(point);
            updateFieldDTO.setExtent_size(Double.parseDouble(extent_size));
            updateFieldDTO.setImage_1(updateBase64ProfilePic1);
            updateFieldDTO.setImage_2(updateBase64ProfilePic2);

            fieldService.updateField(updateFieldDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (FieldNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
