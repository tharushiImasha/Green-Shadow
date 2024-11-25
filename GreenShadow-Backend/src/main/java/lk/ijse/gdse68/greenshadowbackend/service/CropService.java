package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.customObj.CropResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;

import java.util.List;

public interface CropService {
    String generateNextCropId();
    String saveCrop(CropDTO cropDTO) throws Exception;
    void updateCrop(CropDTO cropDTO) throws Exception;
    void deleteCrop(String crop_code) throws Exception;
    List<CropDTO> getAllCrops() throws Exception;
    CropResponse getCrop(String crop_code) throws Exception;
}
