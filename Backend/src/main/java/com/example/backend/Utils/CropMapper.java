package com.example.backend.Utils;

import com.example.backend.DTO.CropRecommendationDTO;
import com.example.backend.Model.CropRecommendations;
import com.example.backend.Model.LandPlot;

public class CropMapper {
    public static CropRecommendations mapToCropRecommendation(CropRecommendationDTO cropRecommendationDTO, LandPlot plot) {
        CropRecommendations cropRecommendations = new CropRecommendations();
        cropRecommendations.setCropName1(cropRecommendationDTO.getCropName1());
        cropRecommendations.setCropName2(cropRecommendationDTO.getCropName2());
        cropRecommendations.setCropName3(cropRecommendationDTO.getCropName3());
        cropRecommendations.setLandPlot(plot);
        cropRecommendations.setSuitabilityScore1(cropRecommendationDTO.getSuitabilityScore1());
        cropRecommendations.setSuitabilityScore2(cropRecommendationDTO.getSuitabilityScore2());
        cropRecommendations.setSuitabilityScore3(cropRecommendationDTO.getSuitabilityScore3());
        cropRecommendations.setRecommendationDate(cropRecommendationDTO.getRecommendationDate());
        return cropRecommendations;
    }

    public static CropRecommendationDTO mapToCropRecommendationDTO(CropRecommendations cropRecommendations){
        CropRecommendationDTO dto = new CropRecommendationDTO();
        dto.setCropName1(cropRecommendations.getCropName1());
        dto.setCropName2(cropRecommendations.getCropName2());
        dto.setCropName3(cropRecommendations.getCropName3());
        dto.setSuitabilityScore1(cropRecommendations.getSuitabilityScore1());
        dto.setSuitabilityScore2(cropRecommendations.getSuitabilityScore2());
        dto.setSuitabilityScore3(cropRecommendations.getSuitabilityScore3());
        dto.setRecommendationDate(cropRecommendations.getRecommendationDate());
        dto.setLandPlotId(cropRecommendations.getLandPlot().getPlot_id());
        return dto;
    }
}
