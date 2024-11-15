package lk.ijse.gdse68.greenshadowbackend.service.impl;

import lk.ijse.gdse68.greenshadowbackend.dao.FieldDAO;
import lk.ijse.gdse68.greenshadowbackend.dto.impl.FieldDTO;
import lk.ijse.gdse68.greenshadowbackend.entity.impl.FieldEntity;
import lk.ijse.gdse68.greenshadowbackend.exception.DataPersistFailedException;
import lk.ijse.gdse68.greenshadowbackend.service.FieldService;
import lk.ijse.gdse68.greenshadowbackend.util.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FieldServiceIMPL implements FieldService {

    @Autowired
    private FieldDAO fieldDAO;
    @Autowired
    private Mapping mapping;

    public String generateNextId() {
        String lastId = fieldDAO.findLastId();

        if (lastId == null || lastId.isEmpty()) {
            return "F001";
        }

        int idNumber = Integer.parseInt(lastId.substring(1)) + 1;

        return String.format("F%03d", idNumber);
    }

    @Override
    public String saveField(FieldDTO fieldDTO) throws Exception {
        if (fieldDTO.getField_code() == null || fieldDTO.getField_code().isEmpty()) {
            fieldDTO.setField_code(generateNextId());
        }
        FieldEntity fieldEntity = mapping.convertToFieldEntity(fieldDTO);
        FieldEntity save = fieldDAO.save(fieldEntity);
        if (save == null) {
            throw new DataPersistFailedException("Cannot Save Field");
        }

        return "Saved feild successfully";
    }

    @Override
    public String updateField(String field_code, FieldDTO fieldDTO) throws Exception {
        return "";
    }

    @Override
    public String deleteField(String field_code) throws Exception {
        return "";
    }

    @Override
    public List<FieldDTO> getAllField() throws Exception {
        return List.of();
    }

    @Override
    public FieldDTO getField(String field_code) throws Exception {
        return null;
    }
}
