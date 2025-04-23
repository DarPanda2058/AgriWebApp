package com.example.backend.Controller;

import com.example.backend.Service.FertilityPredictionService;
import com.example.backend.Service.SoilDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/soil")
public class SoilDataController {
    @Autowired
    private SoilDataService soilDataService;
    @Autowired
    private FertilityPredictionService fertilityPredictionService;


    @PostMapping("/predict")
    public ResponseEntity<Object> saveSoilData(@RequestBody Map<String, Long> id) {
        try {
            return soilDataService.saveSoilDetailAndPrediction(id.get("plot_id"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error-1", e.getMessage()).toString());
        }
    }

    @PostMapping("/get")
    public ResponseEntity<Object> getSoilData(@RequestBody Map<String, Long> id){
        return soilDataService.fetchSoilDataAndPrediction(id.get("plot_id"));
    }


}


