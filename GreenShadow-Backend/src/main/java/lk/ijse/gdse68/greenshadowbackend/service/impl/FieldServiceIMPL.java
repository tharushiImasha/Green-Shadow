package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.FieldErrorResponse;
import lk.ijse.gdse68.greenshadowbackend.customObj.FieldResponse;
import lk.ijse.gdse68.greenshadowbackend.dao.FieldDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.FieldEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.exception.FieldNotFound;
import lk.ijse.gdse68.greenshadowbackend.service.FieldService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FieldServiceIMPL implements FieldService {

    @Autowired
    private FieldDAO fieldDAO;
    @Autowired
    private Mapping mapping;

    @Override
    public String generateNextId() {
        String lastId = fieldDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "F001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("F%03d", idNumber);
    }

    @Override
    public void saveField(FieldDTO fieldDTO) throws Exception {
        if (fieldDTO.getField_code() == null || fieldDTO.getField_code().isEmpty()) {
            fieldDTO.setField_code(generateNextId());
        }
        FieldEntity fieldEntity = mapping.convertToFieldEntity(fieldDTO);

        FieldEntity save = fieldDAO.save(fieldEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Field");
        }
    }

    @Override
    public void updateField(FieldDTO fieldDTO) throws Exception {
        Optional<FieldEntity> tmpField = fieldDAO.findById(fieldDTO.getField_code());
        if (!tmpField.isPresent()) {
            throw new FieldNotFound("Field not found");
        }else {
            tmpField.get().setField_name(fieldDTO.getField_name());
            tmpField.get().setExtent_size(fieldDTO.getExtent_size());
            tmpField.get().setImage_1(fieldDTO.getImage_1());
            tmpField.get().setImage_2(fieldDTO.getImage_2());
            tmpField.get().setLocation(fieldDTO.getLocation());
        }
    }

    @Override
    public void deleteField(String field_code) throws Exception {
        Optional<FieldEntity> byId = fieldDAO.findById(field_code);
        if (!byId.isPresent()) {
            throw new FieldNotFound("Field not found");
        }else {
            fieldDAO.deleteById(field_code);
        }
    }

    @Override
    public List<FieldDTO> getAllField() throws Exception {
        List<FieldEntity> allField = fieldDAO.findAll();
        return mapping.convertToFieldDTOList(allField);
    }

    @Override
    public FieldResponse getField(String field_code) throws Exception {
        if(fieldDAO.existsById(field_code)) {
            return mapping.convertToFieldDTO(fieldDAO.getReferenceById(field_code));
        }else {
            return new FieldErrorResponse(0, "Field Not Found");
        }
    }
}
