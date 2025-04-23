package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropDTO {
    private Long cropId;
    private String cropName;
    private String plantingSeason;
    private String growthDuration;
    private String waterRequirements;
    private String plantingAdvises;
}