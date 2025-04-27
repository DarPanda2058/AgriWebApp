package com.example.backend.Service;

import com.example.backend.DTO.SoilAndWeatherDataForPrediction;
import com.example.backend.Model.CropRecommendations;
import com.example.backend.Model.LandPlot;
import com.example.backend.Repository.CropRecommendationRepository;
import com.example.backend.Repository.LandRepository;
import com.example.backend.Utils.CropMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class CropRecommendationService {

    @Autowired
    CropRecommendationPredictionService cropRecommendationPredictionService;

    @Autowired
    LandRepository landRepository;

    @Autowired
    CropRecommendationRepository cropRecommendationRepository;

    public ResponseEntity<Object> postCropRecommendation(Map<String, Double> dataForPrediction) {
        SoilAndWeatherDataForPrediction soilAndWeatherDataForPrediction = new SoilAndWeatherDataForPrediction();

        soilAndWeatherDataForPrediction.setN(dataForPrediction.get("n"));
        soilAndWeatherDataForPrediction.setP(dataForPrediction.get("p"));
        soilAndWeatherDataForPrediction.setK(dataForPrediction.get("k"));
        soilAndWeatherDataForPrediction.setPh(dataForPrediction.get("ph"));
        soilAndWeatherDataForPrediction.setTemperature(dataForPrediction.get("temperature"));
        soilAndWeatherDataForPrediction.setHumidity(dataForPrediction.get("humidity"));
        double plot_id = dataForPrediction.get("plot_id");
        Optional<LandPlot> landPlot = landRepository.findById((int) plot_id);
        if (landPlot.isEmpty()) {
            throw new RuntimeException("Land plot not found");
        }

        Map<String, String> recommendations = cropRecommendationPredictionService.predictCropRecommendation(soilAndWeatherDataForPrediction);

//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"1");
        if (recommendations.containsKey("error")) {
            return ResponseEntity.status(400).body(recommendations);
        }

//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"2");
        CropRecommendations cropRecommendations = new CropRecommendations();
//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"3");
        if (cropRecommendationRepository.existsByLandPlot(landPlot.get())) {
//            System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"4");
            cropRecommendations.setRecommendationId(cropRecommendationRepository.findByLandPlot(landPlot.get()).getRecommendationId());
        }
//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"5");
        cropRecommendations.setLandPlot(landPlot.get());
//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"6");
        cropRecommendations.setCropName1(recommendations.get("crop1"));
        cropRecommendations.setCropName2(recommendations.get("crop2"));
        cropRecommendations.setCropName3(recommendations.get("crop3"));
        cropRecommendations.setSuitabilityScore1(Double.parseDouble(recommendations.get("suitabilityScore1")));
        cropRecommendations.setSuitabilityScore2(Double.parseDouble(recommendations.get("suitabilityScore2")));
        cropRecommendations.setSuitabilityScore3(Double.parseDouble(recommendations.get("suitabilityScore3")));
//        System.out.println(cropRecommendationRepository.existsByLandPlot(landPlot.get())+"7");
        cropRecommendations.setRecommendationDate(LocalDate.now());
        cropRecommendationRepository.save(cropRecommendations);
        return ResponseEntity.status(201).body(CropMapper.mapToCropRecommendationDTO(cropRecommendations));
    }

    public ResponseEntity<Object> getCropRecommendation(Long plotId) {

        Optional<LandPlot> landPlot = landRepository.findById(Math.toIntExact(plotId));
        if (landPlot.isEmpty()) {
            throw new RuntimeException("Land plot not found");
        }
        CropRecommendations cropRecommendations = cropRecommendationRepository.findByLandPlot(landPlot.get());
        if (cropRecommendations == null) {
            return ResponseEntity.status(404).body("No recommendations found for this plot.");
        }
        return ResponseEntity.ok(CropMapper.mapToCropRecommendationDTO(cropRecommendations));

    }
}
