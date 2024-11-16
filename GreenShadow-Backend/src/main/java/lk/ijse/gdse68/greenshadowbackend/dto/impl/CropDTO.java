package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.CropResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CropDTO implements SuperDTO, CropResponse {
    private String crop_code;
    private String common_name;
    private String specific_name;
    private String crop_image;
    private String category;
    private String crop_season;
    private String field_code;
    private List<LogsDTO> logsDTOS;
}
