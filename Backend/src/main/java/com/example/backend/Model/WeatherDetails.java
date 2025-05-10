package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "weather_details")
public class WeatherDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weather_id;

    // Geo-coordinates
    private double latitude;
    private double longitude;

    // Hourly data (latest)
    private LocalDate hourlyTime;
    private float soilTemperature0cm;
    private float soilMoisture0to1cm;

    // Daily forecast - Day 1 (today)
    private LocalDate forecastDate1;
    private int weatherCode1;
    private float tempMean1;
    private int humidity1;
    private float visibility1;

    // Daily forecast - Day 2
    private LocalDate forecastDate2;
    private int weatherCode2;
    private float tempMean2;
    private int humidity2;
    private float visibility2;

    // Daily forecast - Day 3
    private LocalDateTime forecastDate3;
    private int weatherCode3;
    private float tempMean3;
    private int humidity3;
    private float visibility3;

    @Column(length = 3000)
    private String weatherAlerts;

    @OneToOne
    @JoinColumn(name = "plot_id") // this is your FK
    private LandPlot landPlot;

}
