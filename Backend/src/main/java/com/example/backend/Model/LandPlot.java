package com.example.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "land_plot")
public class LandPlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plot_id;

    private double latitude;
    private double longitude;
    private String plotName;

    @CreationTimestamp
    private LocalDateTime addedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;


    @OneToOne(mappedBy = "landPlot", cascade = CascadeType.ALL, orphanRemoval = true)
    private CropRecommendations cropRecommendations;


    @OneToOne(mappedBy = "landPlot", cascade = CascadeType.ALL, orphanRemoval = true)
    private SoilDetails soilDetails;


    @OneToOne(mappedBy = "landPlot", cascade = CascadeType.ALL, orphanRemoval = true)
    private WeatherDetails weatherDetails;
}
