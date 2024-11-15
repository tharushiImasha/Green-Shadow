package lk.ijse.gdse68.greenshadowbackend.service;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;

import java.util.List;

public interface CropService {
    String saveCrop(CropDTO cropDTO) throws Exception;
    void updateCrop(String crop_code, CropDTO cropDTO) throws Exception;
    void deleteCrop(String crop_code) throws Exception;
    List<CropDTO> getAllCrops() throws Exception;
    CropDTO getCrop(String crop_code) throws Exception;
}
