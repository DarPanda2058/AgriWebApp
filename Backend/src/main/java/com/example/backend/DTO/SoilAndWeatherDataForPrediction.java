package com.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoilAndWeatherDataForPrediction {
    @JsonProperty("N")
    private double N;
    @JsonProperty("P")
    private double P;
    @JsonProperty("K")
    private double K;
    @JsonProperty("temperature")
    private double temperature;
    @JsonProperty("humidity")
    private double humidity;
    @JsonProperty("ph")
    private double ph;
}
