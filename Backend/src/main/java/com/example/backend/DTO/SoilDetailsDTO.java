package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoilDetailsDTO {

    private double N;
    private double P;
    private double K;
    private double ph;
    private double oc;
    private double zn;
    private double B;

    private String parentSoil;
    private String province;
    private String district;
    private String palika;

    private double latitude;
    private double longitude;

    private String fertilityStatus;

    private Long plot_id;

}
