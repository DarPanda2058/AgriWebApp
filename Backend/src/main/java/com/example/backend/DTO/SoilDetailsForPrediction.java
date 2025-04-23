package com.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class SoilDetailsForPrediction {
    @JsonProperty("N")
    private double N;
    @JsonProperty("P")
    private double P;
    @JsonProperty("K")
    private double K;
    @JsonProperty("ph")
    private double ph;
    @JsonProperty("oc")
    private double oc;
    @JsonProperty("zn")
    private double zn;
    @JsonProperty("B")
    private double B;
}
