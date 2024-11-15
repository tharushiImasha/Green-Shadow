package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dao.CropDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.CropEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.service.CropService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CropServiceIMPL implements CropService {

    @Autowired
    private CropDAO cropDAO;
    @Autowired
    private Mapping mapping;

    public String generateNextCropId() {
        String lastId = cropDAO.findLastCropId();

        if (lastId == null || lastId.isEmpty()) {
            return "C001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("C%03d", idNumber);
    }

    @Override
    public String saveCrop(CropDTO cropDTO) throws Exception {
        if (cropDTO.getCrop_code() == null || cropDTO.getCrop_code().isEmpty()) {
            cropDTO.setCrop_code(generateNextCropId());
        }
        CropEntity cropEntity = mapping.convertToCropEntity(cropDTO);
        CropEntity save = cropDAO.save(cropEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Crop");
        }

        return "Saved crop successfully";
    }

    @Override
    public void updateCrop(String crop_code, CropDTO cropDTO) throws Exception {

    }

    @Override
    public void deleteCrop(String crop_code) throws Exception {

    }

    @Override
    public List<CropDTO> getAllCrops() throws Exception {
        return List.of();
    }

    @Override
    public CropDTO getCrop(String crop_code) throws Exception {
        return null;
    }
}
