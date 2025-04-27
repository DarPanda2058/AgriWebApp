package com.example.backend.Service;

import com.example.backend.DTO.SoilAndWeatherDataForPrediction;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Service
public class CropRecommendationPredictionService {

    public Map<String, String> predictCropRecommendation(SoilAndWeatherDataForPrediction soilAndWeatherDataForPrediction) {
        Map<String, String> recommendationMap = new HashMap<>();
        try{
            String jsonInput = new ObjectMapper()
                    .writeValueAsString(soilAndWeatherDataForPrediction);
            Process process = getRecommendationProcess(jsonInput);


            String output = new BufferedReader(new InputStreamReader(process.getInputStream()))
                    .readLine();


            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(output);
            JsonNode recommendations = root.get("recommendations");

            if (recommendations != null && recommendations.size() >= 3) {
                recommendationMap.put("crop1", recommendations.get(0).get("crop").asText());
                recommendationMap.put("crop2", recommendations.get(1).get("crop").asText());
                recommendationMap.put("crop3", recommendations.get(2).get("crop").asText());

                recommendationMap.put("suitabilityScore1", recommendations.get(0).get("confidence").asText().replace("%", ""));
                recommendationMap.put("suitabilityScore2", recommendations.get(1).get("confidence").asText().replace("%", ""));
                recommendationMap.put("suitabilityScore3", recommendations.get(2).get("confidence").asText().replace("%", ""));
            } else {
                recommendationMap.put("error", "Insufficient recommendations in response.");
            }

        }catch (Exception e) {
            System.out.println("here1");
            recommendationMap.put("error", "Failed to process prediction: " + e.getMessage());
        }

        return recommendationMap;
    }
    private static Process getRecommendationProcess(String jsonInput) throws IOException {
        String escapedJson = "\"" + jsonInput.replace("\"", "\\\"") + "\"";  // Escape for shell compatibility

        // Prepare command to call Python script
        List<String> command = List.of(
                "python",
                "src\\main\\resources\\RandomForest_Model\\recommendCrop.py",
                escapedJson
        );



        // Start the process
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);
        return processBuilder.start();
    }
}
