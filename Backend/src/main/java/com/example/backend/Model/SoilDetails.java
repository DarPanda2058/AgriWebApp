package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "soil_details")
public class SoilDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long soil_id;
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


    @OneToOne
    @JoinColumn(name = "plot_id") // this is your FK
    private LandPlot landPlot;
}
