package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropRecommendationDTO {
    private Long landPlotId;
    private String cropName1;
    private String cropName2;
    private String cropName3;

    private double suitabilityScore1;
    private double suitabilityScore2;
    private double suitabilityScore3;
    private LocalDate recommendationDate;
}