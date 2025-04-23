package com.example.backend.Controller;

import com.example.backend.DTO.SoilDetailsDTO;
import com.example.backend.DTO.SoilDetailsForPrediction;
import com.example.backend.Service.FertilityPredictionService;
import com.example.backend.Service.SoilDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/* This Controller may not be needed in the future. ^*/

@CrossOrigin
@RestController
@RequestMapping("/api/predict")
public class PredictionController {
    @Autowired
    SoilDataService soilDataService;
    @Autowired
    FertilityPredictionService fertilityPredictionService;

    @GetMapping
    public Object predictSoilFertility(@RequestParam double lat, @RequestParam double lon) {
        // Fetch soil data
        SoilDetailsDTO soilDetailsDTO = soilDataService.fetchSoilData(lat, lon);

        // Convert to prediction data
        SoilDetailsForPrediction predictionData = new SoilDetailsForPrediction(
                soilDetailsDTO.getN(), soilDetailsDTO.getP(), soilDetailsDTO.getK(),
                soilDetailsDTO.getPh(), soilDetailsDTO.getOc(), soilDetailsDTO.getZn(),
                soilDetailsDTO.getB()
        );

        // Send to prediction service
        return fertilityPredictionService.predictFertility(predictionData);
    }
}
