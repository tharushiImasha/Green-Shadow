package lk.ijse.gdse68.greenshadowbackend.controller;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
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

@RestController
@RequestMapping("api/v1/field")
@RequiredArgsConstructor
public class FieldController {

    @Autowired
    private final FieldService fieldService;

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
            Point point = new Point(Integer.parseInt(coordinates[0].trim()), Integer.parseInt(coordinates[0].trim()));

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
}
