package lk.ijse.gdse68.greenshadowbackend.util;

import lk.ijse.gdse68.greenshadowbackend.dto.impl.CropDTO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.CropEntity;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.FieldEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Mapping {
    @Autowired
    private ModelMapper modelMapper;

    //Matters of CropEntity and Dto
    public CropDTO convertToCropDTO(CropEntity crop) {
        return modelMapper.map(crop, CropDTO.class);
    }
    public CropEntity convertToCropEntity(CropDTO cropDTO) {
        return modelMapper.map(cropDTO, CropEntity.class);
    }

    //Matters of FiledEntity and Dto
    public FieldDTO convertToFieldDTO(FieldEntity crop) {
        return modelMapper.map(crop, FieldDTO.class);
    }
    public FieldEntity convertToFieldEntity(FieldDTO fieldDTO) {
        return modelMapper.map(fieldDTO, FieldEntity.class);
    }
}
