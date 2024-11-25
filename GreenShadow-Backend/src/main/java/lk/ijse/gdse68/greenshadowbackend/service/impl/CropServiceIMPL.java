package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.CropErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.CropResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.CropDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.CropEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.FieldNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.CropService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CropServiceIMPL implements CropService {

    @Autowired
    private CropDAO cropDAO;
    @Autowired
    private Mapping mapping;

    @Override
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
    public void updateCrop(CropDTO cropDTO) throws Exception {
        Optional<CropEntity> tmpCrop = cropDAO.findById(cropDTO.getCrop_code());
        if (!tmpCrop.isPresent()) {
            throw new FieldNotFound("Crop not found");
        }else {
            tmpCrop.get().setCommon_name(cropDTO.getCommon_name());
            tmpCrop.get().setSpecific_name(cropDTO.getSpecific_name());
            tmpCrop.get().setCrop_image(cropDTO.getCrop_image());
            tmpCrop.get().setCategory(cropDTO.getCategory());
            tmpCrop.get().setCrop_season(cropDTO.getCrop_season());
//            tmpCrop.get().setField(cropDTO.getField_code());
        }
    }

    @Override
    public void deleteCrop(String crop_code) throws Exception {
        Optional<CropEntity> byId = cropDAO.findById(crop_code);
        if (!byId.isPresent()) {
            throw new FieldNotFound("Crop not found");
        }else {
            cropDAO.deleteById(crop_code);
        }
    }

    @Override
    public List<CropDTO> getAllCrops() throws Exception {
        List<CropEntity> allCrop = cropDAO.findAll();
        return mapping.convertToCropDTOList(allCrop);
    }

    @Override
    public CropResponse getCrop(String crop_code) throws Exception {
        if(cropDAO.existsById(crop_code)) {
            return mapping.convertToCropDTO(cropDAO.getReferenceById(crop_code));
        }else {
            return new CropErrorResponse(0, "Crop Not Found");
        }
    }
}
