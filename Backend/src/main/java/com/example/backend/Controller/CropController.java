package com.example.backend.Controller;

import com.example.backend.Service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/crop")
@Controller
public class CropController {

    @Autowired
    CropService cropService;

    @PostMapping("/get")
    public ResponseEntity<Object> getCrops(@RequestBody Map<String, String> name) {
        return cropService.getCrops(name.get("name"));
    }
}
