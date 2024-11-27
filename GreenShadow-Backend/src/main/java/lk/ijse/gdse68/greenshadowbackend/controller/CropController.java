package lk.ijse.gdse68.greenshadowbackend.controller;

import lk.ijse.gdse68.greenshadowbackend.customObj.CropResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;
import lk.ijse.gdse68.greenshadowbackend.exception.CropNotFound;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.FieldNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.CropService;
import lk.ijse.gdse68.greenshadowbackend.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/crop")
@RequiredArgsConstructor
@CrossOrigin
public class CropController {

    @Autowired
    private final CropService cropService;

    @GetMapping("/next-id")
    public ResponseEntity<String> getNextCropId() {
        String nextCropId = cropService.generateNextCropId();
        return ResponseEntity.ok(nextCropId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> saveField(
            @RequestPart("common_name") String common_name,
            @RequestPart("specific_name") String specific_name,
            @RequestPart("crop_image") MultipartFile crop_image,
            @RequestPart("category") String category,
            @RequestPart("crop_season") String crop_season,
            @RequestPart("field_code") String field_code
    ){
        try {
            byte[] imageByteCollection1 = crop_image.getBytes();
            String base64Image = AppUtil.toBase64image(imageByteCollection1);

            CropDTO buildCropDTO = new CropDTO();
            buildCropDTO.setCommon_name(common_name);
            buildCropDTO.setSpecific_name(specific_name);
            buildCropDTO.setCrop_image(base64Image);
            buildCropDTO.setCategory(category);
            buildCropDTO.setCrop_season(crop_season);
            buildCropDTO.setField_code(field_code);

            cropService.updateCrop(buildCropDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (DataPersistFailedException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable("id") String crop_code){
        try {
            cropService.deleteCrop(crop_code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (CropNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CropResponse getSelectedCrop(@PathVariable("id") String crop_code) throws Exception {
        return cropService.getCrop(crop_code);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CropDTO> getAllCrops() throws Exception {
        return cropService.getAllCrops();
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateCrop(@PathVariable("id") String id,
                                           @RequestPart("common_name") String common_name,
                                           @RequestPart("specific_name") String specific_name,
                                           @RequestPart("crop_image") MultipartFile crop_image,
                                           @RequestPart("category") String category,
                                           @RequestPart("crop_season") String crop_season,
                                           @RequestPart("field_code") String field_code
    ){

        try {
            byte[] imageByteCollection = crop_image.getBytes();
            String updateBase64ProfilePic = AppUtil.toBase64image(imageByteCollection);

            CropDTO updateCropDTO = new CropDTO();
            updateCropDTO.setCrop_code(id);
            updateCropDTO.setCommon_name(common_name);
            updateCropDTO.setSpecific_name(specific_name);
            updateCropDTO.setCategory(category);
            updateCropDTO.setCrop_image(updateBase64ProfilePic);
            updateCropDTO.setCrop_season(crop_season);
            updateCropDTO.setField_code(field_code);

            cropService.updateCrop(updateCropDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (FieldNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
