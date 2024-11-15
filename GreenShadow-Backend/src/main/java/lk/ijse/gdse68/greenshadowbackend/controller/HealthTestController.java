package lk.ijse.gdse68.greenshadowbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/healthTest")
public class HealthTestController {
    @GetMapping
    public String getHealthTest(){
        return "Health Test";
    }
}
