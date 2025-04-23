package com.example.backend.Service;

import com.example.backend.Model.Crops;
import com.example.backend.Repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CropService {

    @Autowired
    CropRepository cropRepository;

    public ResponseEntity<Object> getCrops(String name) {
        if(name == null || name.isEmpty()) {
            return ResponseEntity.badRequest().body("Crop name cannot be null or empty");
        }
        Crops crops = cropRepository.findByCropName(name);
        return ResponseEntity.ok(crops);
    }
}
