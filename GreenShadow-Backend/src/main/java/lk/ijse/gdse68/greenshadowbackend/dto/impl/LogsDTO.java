package lk.ijse.gdse68.greenshadowbackend.dto.impl;

import lk.ijse.gdse68.greenshadowbackend.customObj.LogResponse;
import lk.ijse.gdse68.greenshadowbackend.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class LogsDTO implements SuperDTO, LogResponse {
    private String log_code;
    private String  log_date;
    private String log_details;
    private String observed_image;
    private String field_code;
    private String crop_code;
    private String id;
}
