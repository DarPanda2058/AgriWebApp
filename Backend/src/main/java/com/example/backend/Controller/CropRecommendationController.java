package com.example.backend.Controller;

import com.example.backend.Service.CropRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/crop/recommendation")
@Controller
public class CropRecommendationController {

    @Autowired
    CropRecommendationService cropRecommendationService;

    @PostMapping("/save")
    public ResponseEntity<Object> saveCropRecommendation(@RequestBody Map<String, Double> dataForPrediction) {
        return cropRecommendationService.postCropRecommendation(dataForPrediction);
    }

    @PostMapping("/get")
    public ResponseEntity<Object> getCropRecommendation(@RequestBody Map<String, Long> id) {
        return cropRecommendationService.getCropRecommendation(id.get("plot_id"));
    }
}
