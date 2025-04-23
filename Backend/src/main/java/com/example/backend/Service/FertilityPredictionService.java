package com.example.backend.Service;

import com.example.backend.DTO.SoilDetailsForPrediction;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
@Service
public class FertilityPredictionService {
    public Object predictFertility(SoilDetailsForPrediction soilDetailsForPrediction) {
        try {
            // Convert input map to valid JSON string
            String jsonInput = new ObjectMapper()
                    .writeValueAsString(soilDetailsForPrediction);

            Process process = getFertilityProcess(jsonInput);



            // Read script output
            String output = new BufferedReader(new InputStreamReader(process.getInputStream()))
                    .readLine();

            Integer prediction = (Integer) new ObjectMapper()
                    .readValue(output, Map.class)
                    .get("prediction");
            if (prediction == null){
                return ResponseEntity.status(500).body("Error: 'prediction' key not found in script output.");
            }
            String fertilityStatus = prediction == 0 ? "Infertile" :
                                     prediction == 1 ? "Fertile" :
                                     prediction == 2 ? "Highly Fertile" : "Unknown";

            // Return prediction or error
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return fertilityStatus;
            } else {
                return ResponseEntity.status(500).body("Python script failed: " + output);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    private static Process getFertilityProcess(String jsonInput) throws IOException {
        String escapedJson = "\"" + jsonInput.replace("\"", "\\\"") + "\"";  // Escape for shell compatibility

        // Prepare command to call Python script
        List<String> command = List.of(
                "python",
                "src\\main\\resources\\RandomForest_Model\\fertilityPredict.py",
                escapedJson
        );



        // Start the process
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);
        return processBuilder.start();
    }
}
